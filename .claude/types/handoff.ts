/**
 * 에이전트 간 핸드오프 메시지 타입 정의
 *
 * 에이전트가 다른 에이전트에게 작업을 위임할 때 사용하는 메시지 구조입니다.
 */

import { BaseContext, AgentId, WorkflowType, WorkflowPhase } from './context';

// ============================================================================
// 핸드오프 메시지
// ============================================================================

/**
 * 에이전트 간 핸드오프 메시지
 */
export interface HandoffMessage {
  // 메시지 식별
  id: string;                    // UUID v4
  timestamp: string;             // ISO 8601

  // 발신/수신
  from: AgentId;
  to: AgentId;

  // 워크플로우 정보
  workflow: {
    id: string;
    type: WorkflowType;
    currentPhase: WorkflowPhase;
    nextPhase: WorkflowPhase;
  };

  // 전달 컨텍스트
  context: {
    primary: BaseContext;        // 주 컨텍스트
    supporting: BaseContext[];   // 참조 컨텍스트
    summary: string;             // 요약 (토큰 절감용)
  };

  // 지시사항
  instruction: {
    task: string;                // 수행할 작업
    constraints: string[];       // 제약사항
    expectedOutput: string;      // 기대 출력
    deadline?: string;           // 마감 (선택)
  };

  // 에스컬레이션 조건
  escalation?: {
    condition: string;           // 에스컬레이션 조건
    target: AgentId;             // 에스컬레이션 대상
    message: string;             // 에스컬레이션 메시지
  };

  // 메타데이터
  metadata: {
    priority: 'low' | 'normal' | 'high' | 'critical';
    timeoutMs: number;
    retryable: boolean;
    maxRetries: number;
  };
}

// ============================================================================
// 핸드오프 결과
// ============================================================================

/**
 * 핸드오프 처리 결과
 */
export interface HandoffResult {
  handoffId: string;
  status: 'success' | 'partial' | 'failed';

  // 생성된 컨텍스트
  outputContext?: BaseContext;

  // 처리 시간
  processingTime: {
    startedAt: string;
    completedAt: string;
    durationMs: number;
  };

  // 토큰 사용량
  tokenUsage: {
    input: number;
    output: number;
    total: number;
  };

  // 오류 (실패 시)
  error?: {
    code: string;
    message: string;
    recoverable: boolean;
    stackTrace?: string;
  };

  // 다음 단계
  nextAction: {
    type: 'continue' | 'escalate' | 'retry' | 'complete' | 'pause';
    targetAgent?: AgentId;
    context?: BaseContext;
    reason?: string;
  };
}

// ============================================================================
// 핸드오프 요청 빌더
// ============================================================================

/**
 * 핸드오프 메시지 생성 헬퍼
 */
export function createHandoffMessage(params: {
  from: AgentId;
  to: AgentId;
  workflowId: string;
  workflowType: WorkflowType;
  currentPhase: WorkflowPhase;
  nextPhase: WorkflowPhase;
  primaryContext: BaseContext;
  task: string;
  expectedOutput: string;
  constraints?: string[];
  supportingContexts?: BaseContext[];
  priority?: 'low' | 'normal' | 'high' | 'critical';
  timeoutMs?: number;
}): HandoffMessage {
  const now = new Date().toISOString();

  return {
    id: generateUUID(),
    timestamp: now,
    from: params.from,
    to: params.to,
    workflow: {
      id: params.workflowId,
      type: params.workflowType,
      currentPhase: params.currentPhase,
      nextPhase: params.nextPhase,
    },
    context: {
      primary: params.primaryContext,
      supporting: params.supportingContexts || [],
      summary: generateContextSummary(params.primaryContext),
    },
    instruction: {
      task: params.task,
      constraints: params.constraints || [],
      expectedOutput: params.expectedOutput,
    },
    metadata: {
      priority: params.priority || 'normal',
      timeoutMs: params.timeoutMs || 300000,
      retryable: true,
      maxRetries: 2,
    },
  };
}

/**
 * 핸드오프 결과 생성 헬퍼
 */
export function createHandoffResult(params: {
  handoffId: string;
  status: 'success' | 'partial' | 'failed';
  outputContext?: BaseContext;
  startedAt: string;
  tokenUsage?: { input: number; output: number };
  error?: { code: string; message: string; recoverable: boolean };
  nextAction: HandoffResult['nextAction'];
}): HandoffResult {
  const completedAt = new Date().toISOString();
  const startTime = new Date(params.startedAt).getTime();
  const endTime = new Date(completedAt).getTime();

  return {
    handoffId: params.handoffId,
    status: params.status,
    outputContext: params.outputContext,
    processingTime: {
      startedAt: params.startedAt,
      completedAt,
      durationMs: endTime - startTime,
    },
    tokenUsage: {
      input: params.tokenUsage?.input || 0,
      output: params.tokenUsage?.output || 0,
      total: (params.tokenUsage?.input || 0) + (params.tokenUsage?.output || 0),
    },
    error: params.error,
    nextAction: params.nextAction,
  };
}

// ============================================================================
// 유틸리티 함수
// ============================================================================

function generateUUID(): string {
  // 간단한 UUID v4 생성 (실제 환경에서는 uuid 라이브러리 사용 권장)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateContextSummary(context: BaseContext): string {
  // 컨텍스트 요약 생성 (토큰 절감용)
  const type = (context as any).type || context.phase;
  return `[${type}] Created by ${context.createdBy} at ${context.createdAt}. ` +
         `Workflow: ${context.workflowId}, Phase: ${context.phase}. ` +
         `Confidence: ${(context.confidence * 100).toFixed(0)}%`;
}

// ============================================================================
// 핸드오프 큐 관리
// ============================================================================

/**
 * 대기 중인 핸드오프 항목
 */
export interface PendingHandoff {
  message: HandoffMessage;
  attempts: number;
  lastAttemptAt?: string;
  status: 'queued' | 'processing' | 'retrying';
}

/**
 * 핸드오프 이력 항목
 */
export interface HandoffHistoryEntry {
  id: string;
  message: HandoffMessage;
  result: HandoffResult;
  completedAt: string;
}

/**
 * 핸드오프 큐 상태
 */
export interface HandoffQueueState {
  workflowId: string;
  pending: PendingHandoff[];
  history: HandoffHistoryEntry[];
  stats: {
    totalHandoffs: number;
    successful: number;
    failed: number;
    avgDurationMs: number;
    totalTokens: number;
  };
}
