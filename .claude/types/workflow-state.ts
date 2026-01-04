/**
 * 워크플로우 상태 관리 타입 정의
 *
 * 워크플로우 인스턴스의 상태를 추적하고 관리하기 위한 타입입니다.
 */

import { AgentId, WorkflowType, WorkflowPhase, WorkflowStatus, BaseContext } from './context';
import { HandoffHistoryEntry } from './handoff';

// ============================================================================
// 워크플로우 상태
// ============================================================================

/**
 * 워크플로우 인스턴스 상태
 */
export interface WorkflowState {
  // 기본 정보
  id: string;
  type: WorkflowType;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;

  // 상태
  status: WorkflowStatus;
  currentPhase: WorkflowPhase;
  currentAgent: AgentId | null;

  // 진행 상황
  progress: {
    completedPhases: WorkflowPhase[];
    pendingPhases: WorkflowPhase[];
    overallProgress: number;     // 0-100
  };

  // 컨텍스트 체인
  contextChain: ContextChainEntry[];

  // 핸드오프 이력
  handoffHistory: HandoffHistoryEntry[];

  // 메트릭
  metrics: WorkflowMetrics;

  // 체크포인트 (복구용)
  checkpoints: Checkpoint[];

  // 사용자 입력 대기 (있는 경우)
  pendingInput?: PendingUserInput;

  // 에러 정보 (실패 시)
  error?: WorkflowError;
}

/**
 * 컨텍스트 체인 항목
 */
export interface ContextChainEntry {
  phaseId: string;
  contextId: string;
  contextPath: string;           // 파일 경로
  agentId: AgentId;
  status: 'completed' | 'active' | 'pending' | 'failed';
  timestamp: string;
  summary?: string;
}

/**
 * 워크플로우 메트릭
 */
export interface WorkflowMetrics {
  totalDuration: number;         // ms
  tokenUsage: {
    total: number;
    byAgent: { [agent: string]: number };
    byPhase: { [phase: string]: number };
  };
  retryCount: number;
  errorCount: number;
  handoffCount: number;
  estimatedCost: number;         // USD
}

/**
 * 체크포인트 (복구용)
 */
export interface Checkpoint {
  id: string;
  phase: WorkflowPhase;
  timestamp: string;
  state: Partial<WorkflowState>;
  contextSnapshotPath: string;   // 컨텍스트 스냅샷 파일 경로
  reason: 'auto' | 'manual' | 'before-risky-operation';
}

/**
 * 사용자 입력 대기
 */
export interface PendingUserInput {
  requestId: string;
  requestedAt: string;
  type: 'approval' | 'selection' | 'text' | 'confirmation';
  message: string;
  options?: string[];
  timeoutAt?: string;
  context?: any;
}

/**
 * 워크플로우 에러
 */
export interface WorkflowError {
  code: string;
  message: string;
  phase: WorkflowPhase;
  agent: AgentId;
  timestamp: string;
  recoverable: boolean;
  suggestedAction?: string;
  stackTrace?: string;
}

// ============================================================================
// 워크플로우 이벤트
// ============================================================================

/**
 * 워크플로우 이벤트 타입
 */
export type WorkflowEventType =
  | 'workflow:started'
  | 'workflow:completed'
  | 'workflow:failed'
  | 'workflow:paused'
  | 'workflow:resumed'
  | 'workflow:cancelled'
  | 'phase:started'
  | 'phase:completed'
  | 'phase:failed'
  | 'handoff:initiated'
  | 'handoff:completed'
  | 'handoff:failed'
  | 'checkpoint:created'
  | 'checkpoint:restored'
  | 'input:requested'
  | 'input:received'
  | 'quality-gate:passed'
  | 'quality-gate:failed';

/**
 * 워크플로우 이벤트
 */
export interface WorkflowEvent {
  id: string;
  type: WorkflowEventType;
  workflowId: string;
  timestamp: string;
  data: {
    phase?: WorkflowPhase;
    agent?: AgentId;
    contextId?: string;
    message?: string;
    error?: WorkflowError;
    metrics?: Partial<WorkflowMetrics>;
  };
}

// ============================================================================
// 워크플로우 관리 함수
// ============================================================================

/**
 * 새 워크플로우 상태 생성
 */
export function createWorkflowState(params: {
  type: WorkflowType;
  name: string;
  description?: string;
  phases: WorkflowPhase[];
}): WorkflowState {
  const now = new Date().toISOString();

  return {
    id: generateWorkflowId(),
    type: params.type,
    name: params.name,
    description: params.description,
    createdAt: now,
    updatedAt: now,
    status: 'initialized',
    currentPhase: params.phases[0],
    currentAgent: null,
    progress: {
      completedPhases: [],
      pendingPhases: params.phases,
      overallProgress: 0,
    },
    contextChain: [],
    handoffHistory: [],
    metrics: {
      totalDuration: 0,
      tokenUsage: { total: 0, byAgent: {}, byPhase: {} },
      retryCount: 0,
      errorCount: 0,
      handoffCount: 0,
      estimatedCost: 0,
    },
    checkpoints: [],
  };
}

/**
 * 워크플로우 상태 업데이트
 */
export function updateWorkflowState(
  state: WorkflowState,
  update: Partial<WorkflowState>
): WorkflowState {
  return {
    ...state,
    ...update,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Phase 완료 처리
 */
export function completePhase(
  state: WorkflowState,
  phase: WorkflowPhase,
  contextEntry: ContextChainEntry
): WorkflowState {
  const completedPhases = [...state.progress.completedPhases, phase];
  const pendingPhases = state.progress.pendingPhases.filter(p => p !== phase);
  const overallProgress = (completedPhases.length / (completedPhases.length + pendingPhases.length)) * 100;

  return updateWorkflowState(state, {
    progress: {
      completedPhases,
      pendingPhases,
      overallProgress,
    },
    contextChain: [...state.contextChain, contextEntry],
    currentPhase: pendingPhases[0] || phase,
  });
}

/**
 * 체크포인트 생성
 */
export function createCheckpoint(
  state: WorkflowState,
  reason: Checkpoint['reason']
): Checkpoint {
  const checkpointId = `cp-${Date.now()}`;

  return {
    id: checkpointId,
    phase: state.currentPhase,
    timestamp: new Date().toISOString(),
    state: {
      status: state.status,
      currentPhase: state.currentPhase,
      progress: state.progress,
      metrics: state.metrics,
    },
    contextSnapshotPath: `.claude/workflow/active/${state.id}/checkpoints/${checkpointId}.json`,
    reason,
  };
}

/**
 * 워크플로우 ID 생성
 */
function generateWorkflowId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `wf-${timestamp}-${random}`;
}

// ============================================================================
// 상태 직렬화/역직렬화
// ============================================================================

/**
 * 상태를 JSON 문자열로 직렬화
 */
export function serializeWorkflowState(state: WorkflowState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * JSON 문자열에서 상태 역직렬화
 */
export function deserializeWorkflowState(json: string): WorkflowState {
  const parsed = JSON.parse(json);
  // 기본 검증
  if (!parsed.id || !parsed.type || !parsed.status) {
    throw new Error('Invalid workflow state JSON');
  }
  return parsed as WorkflowState;
}

// ============================================================================
// 상태 파일 경로 헬퍼
// ============================================================================

/**
 * 워크플로우 관련 파일 경로 생성
 */
export function getWorkflowPaths(workflowId: string) {
  const base = `.claude/workflow/active/${workflowId}`;

  return {
    state: `${base}/state.json`,
    context: (contextId: string) => `${base}/context/${contextId}.json`,
    handoff: (handoffId: string) => `${base}/handoffs/${handoffId}.json`,
    checkpoint: (checkpointId: string) => `${base}/checkpoints/${checkpointId}.json`,
    log: `${base}/workflow.log`,
  };
}
