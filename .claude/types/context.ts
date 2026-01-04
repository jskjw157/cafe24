/**
 * Cafe24 에이전트 컨텍스트 타입 정의
 *
 * 이 파일은 에이전트 간 핸드오프에 사용되는 모든 컨텍스트 타입을 정의합니다.
 * 실제 런타임에서는 JSON 형태로 저장/전달되며, 이 타입은 스키마 문서 역할을 합니다.
 */

// ============================================================================
// 기본 타입 정의
// ============================================================================

/**
 * 에이전트 식별자
 */
export type AgentId =
  | 'tech-lead'
  | 'ddd-expert'
  | 'feature-planning-expert'
  | 'cafe24-skin-expert'
  | 'cafe24-api-crawler'
  | 'app-requirement-analyzer'
  | 'cafe24-oauth-generator'
  | 'fastapi-expert'
  | 'testsprite-orchestrator'
  | 'playwright-test-planner'
  | 'playwright-test-generator'
  | 'playwright-test-healer'
  | 'docs-validator'
  | 'github-issues-expert';

/**
 * 워크플로우 유형
 */
export type WorkflowType =
  | 'feature-development'
  | 'cafe24-app-development'
  | 'test-automation'
  | 'document-driven-development';

/**
 * 워크플로우 단계
 */
export type WorkflowPhase =
  | 'requirements'
  | 'design'
  | 'planning'
  | 'implementation'
  | 'testing'
  | 'review'
  | 'deployment';

/**
 * 워크플로우 상태
 */
export type WorkflowStatus =
  | 'initialized'
  | 'running'
  | 'paused'
  | 'waiting_input'
  | 'completed'
  | 'failed'
  | 'cancelled';

// ============================================================================
// 기본 컨텍스트 인터페이스
// ============================================================================

/**
 * 모든 컨텍스트의 기본 인터페이스
 */
export interface BaseContext {
  // 메타데이터
  id: string;                    // UUID v4
  version: string;               // 시맨틱 버전 (예: "1.0.0")
  createdAt: string;             // ISO 8601 형식
  createdBy: AgentId;            // 생성한 에이전트

  // 워크플로우 추적
  workflowId: string;            // 워크플로우 인스턴스 ID
  workflowType: WorkflowType;    // 워크플로우 유형
  phase: WorkflowPhase;          // 현재 단계

  // 컨텍스트 연결 (체이닝)
  parentContextId?: string;      // 이전 컨텍스트 ID
  childContextIds: string[];     // 파생된 컨텍스트 IDs

  // 품질 메트릭
  confidence: number;            // 0-1 범위의 신뢰도
  validationStatus: 'pending' | 'valid' | 'invalid';
}

// ============================================================================
// 공통 하위 타입
// ============================================================================

export interface Feature {
  id: string;
  name: string;
  description: string;
  priority: 'must' | 'should' | 'could' | 'wont';
  complexity: 'low' | 'medium' | 'high';
  dependencies: string[];
}

export interface Cafe24ApiReference {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  requiredScope: string;
  description: string;
}

export interface GeneratedFile {
  path: string;
  type: 'source' | 'test' | 'config' | 'migration';
  language: string;
  linesOfCode: number;
}

export interface ApiEndpoint {
  path: string;
  method: string;
  summary: string;
  requestBody?: string;
  responseType: string;
}

export interface TestCaseResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshot?: string;
}

// ============================================================================
// 도메인 설계 관련 타입 (ddd-expert)
// ============================================================================

export interface BoundedContext {
  id: string;
  name: string;
  description: string;
  responsibility: string;
  aggregates: string[];
  upstreamContexts: string[];
  downstreamContexts: string[];
}

export interface Aggregate {
  id: string;
  name: string;
  rootEntity: string;
  entities: string[];
  valueObjects: string[];
  invariants: string[];
  commands: Command[];
  events: string[];
}

export interface Command {
  name: string;
  parameters: { name: string; type: string }[];
  preconditions: string[];
  postconditions: string[];
}

export interface DomainEvent {
  id: string;
  name: string;
  triggeredBy: string;
  payload: { name: string; type: string }[];
  consumers: string[];
}

export interface Entity {
  id: string;
  name: string;
  attributes: { name: string; type: string; required: boolean }[];
  behaviors: string[];
}

export interface ValueObject {
  id: string;
  name: string;
  attributes: { name: string; type: string }[];
  validationRules: string[];
}

// ============================================================================
// 계획 관련 타입 (feature-planning-expert)
// ============================================================================

export interface Phase {
  id: string;
  name: string;
  order: number;
  description: string;

  tddSteps: {
    red: TestSpec[];
    green: ImplementationTask[];
    refactor: RefactorTask[];
  };

  dependsOn: string[];
  estimatedHours: number;
  assignedAgents: AgentId[];
}

export interface TestSpec {
  id: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e';
  targetComponent: string;
}

export interface ImplementationTask {
  id: string;
  description: string;
  files: string[];
  acceptanceCriteria: string[];
}

export interface RefactorTask {
  id: string;
  description: string;
  targetFiles: string[];
  pattern: string;
}

export interface QualityGate {
  id: string;
  name: string;
  phase: string;
  criteria: GateCriteria[];
  blocking: boolean;
}

export interface GateCriteria {
  type: 'test-pass' | 'coverage' | 'lint' | 'review' | 'manual';
  threshold?: number;
  description: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  phases: string[];
}

export interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

// ============================================================================
// 검증 관련 타입 (docs-validator)
// ============================================================================

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  location: string;
  message: string;
  suggestion?: string;
}

export interface ConsistencyCheck {
  documentPath: string;
  isConsistent: boolean;
  discrepancies: string[];
}

// ============================================================================
// GitHub 관련 타입 (github-issues-expert)
// ============================================================================

export interface GitHubMilestone {
  id: number;
  title: string;
  dueDate: string;
  issueCount: number;
}

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  labels: string[];
  milestone: string;
  assignees: string[];
  linkedFeature: string;
}

// ============================================================================
// 타입 가드 유틸리티
// ============================================================================

export function isBaseContext(obj: unknown): obj is BaseContext {
  if (typeof obj !== 'object' || obj === null) return false;
  const ctx = obj as BaseContext;
  return (
    typeof ctx.id === 'string' &&
    typeof ctx.version === 'string' &&
    typeof ctx.createdAt === 'string' &&
    typeof ctx.createdBy === 'string' &&
    typeof ctx.workflowId === 'string'
  );
}

export function getContextType(ctx: BaseContext): string {
  // 타입 필드가 있으면 반환, 없으면 phase 기반 추론
  if ('type' in ctx && typeof (ctx as any).type === 'string') {
    return (ctx as any).type;
  }
  return ctx.phase;
}
