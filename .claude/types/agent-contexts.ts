/**
 * 에이전트별 출력 컨텍스트 타입 정의
 *
 * 각 에이전트가 생성하는 컨텍스트의 구체적인 스키마를 정의합니다.
 */

import {
  BaseContext,
  AgentId,
  Feature,
  Cafe24ApiReference,
  GeneratedFile,
  ApiEndpoint,
  TestCaseResult,
  BoundedContext,
  Aggregate,
  DomainEvent,
  Entity,
  ValueObject,
  Phase,
  QualityGate,
  Milestone,
  Risk,
  ValidationIssue,
  ConsistencyCheck,
  GitHubMilestone,
  GitHubIssue,
} from './context';

// ============================================================================
// app-requirement-analyzer 출력 컨텍스트
// ============================================================================

export interface RequirementContext extends BaseContext {
  type: 'requirement';

  // 분석 결과
  analysis: {
    ideaSummary: string;
    benchmarks: BenchmarkItem[];
    targetUsers: UserPersona[];
  };

  // 도출된 기능
  features: {
    core: Feature[];
    optional: Feature[];
    outOfScope: string[];
  };

  // Cafe24 관련
  cafe24: {
    requiredApis: Cafe24ApiReference[];
    requiredScopes: string[];
    appType: 'public' | 'private';
  };

  // 아키텍처 제안
  architecture: {
    pattern: 'monolith' | 'microservice' | 'serverless';
    stack: TechStackRecommendation;
    integrations: ExternalIntegration[];
  };
}

export interface BenchmarkItem {
  name: string;
  url?: string;
  strengths: string[];
  weaknesses: string[];
  differentiators: string[];
}

export interface UserPersona {
  name: string;
  role: string;
  goals: string[];
  painPoints: string[];
}

export interface TechStackRecommendation {
  backend: string;
  frontend: string;
  database: string;
  cache?: string;
  messageQueue?: string;
}

export interface ExternalIntegration {
  name: string;
  type: 'api' | 'webhook' | 'oauth' | 'sdk';
  purpose: string;
}

// ============================================================================
// ddd-expert 출력 컨텍스트
// ============================================================================

export interface DomainContext extends BaseContext {
  type: 'domain';

  // 전략적 설계
  strategic: {
    boundedContexts: BoundedContext[];
    contextMap: ContextMapping[];
    ubiquitousLanguage: GlossaryItem[];
  };

  // 전술적 설계
  tactical: {
    aggregates: Aggregate[];
    entities: Entity[];
    valueObjects: ValueObject[];
    domainEvents: DomainEvent[];
    domainServices: DomainService[];
  };

  // 코드 생성 힌트
  codeHints: {
    packageStructure: string;
    namingConventions: NamingRule[];
    patterns: DesignPattern[];
  };
}

export interface ContextMapping {
  upstream: string;
  downstream: string;
  relationship: 'partnership' | 'shared-kernel' | 'customer-supplier' |
                'conformist' | 'anticorruption-layer' | 'open-host-service' |
                'published-language';
  description: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
  context: string;
  aliases?: string[];
}

export interface DomainService {
  id: string;
  name: string;
  responsibility: string;
  methods: { name: string; parameters: string[]; returns: string }[];
  dependencies: string[];
}

export interface NamingRule {
  scope: 'class' | 'method' | 'variable' | 'package';
  pattern: string;
  examples: string[];
}

export interface DesignPattern {
  name: string;
  applicableTo: string[];
  rationale: string;
}

// ============================================================================
// feature-planning-expert 출력 컨텍스트
// ============================================================================

export interface PlanningContext extends BaseContext {
  type: 'planning';

  // Phase 정의
  phases: Phase[];

  // 전체 일정
  timeline: {
    startDate: string;
    targetEndDate: string;
    milestones: Milestone[];
  };

  // 품질 게이트
  qualityGates: QualityGate[];

  // 리스크
  risks: Risk[];

  // 리소스
  resources: {
    estimatedTotalHours: number;
    requiredAgents: AgentId[];
    externalDependencies: string[];
  };
}

// ============================================================================
// fastapi-expert 출력 컨텍스트
// ============================================================================

export interface ImplementationContext extends BaseContext {
  type: 'implementation';

  // 생성된 코드
  artifacts: {
    files: GeneratedFile[];
    tests: GeneratedFile[];
    migrations: GeneratedFile[];
  };

  // API 명세
  api: {
    openApiSpecPath: string;
    endpoints: ApiEndpoint[];
    authentication: AuthConfig;
  };

  // 설정
  config: {
    envVariables: EnvVariable[];
    dockerComposePath?: string;
    dependencies: Dependency[];
  };

  // 실행 정보
  runtime: {
    entrypoint: string;
    port: number;
    healthCheckPath: string;
  };
}

export interface AuthConfig {
  type: 'jwt' | 'oauth2' | 'api-key' | 'none';
  provider?: string;
  scopes?: string[];
}

export interface EnvVariable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
  sensitive: boolean;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'runtime' | 'dev' | 'optional';
}

// ============================================================================
// cafe24-skin-expert 출력 컨텍스트
// ============================================================================

export interface FrontendContext extends BaseContext {
  type: 'frontend';

  // 생성된 스킨 파일
  skinFiles: {
    layouts: SkinFile[];
    modules: SkinFile[];
    includes: SkinFile[];
  };

  // 사용된 Cafe24 모듈변수
  moduleVariables: ModuleVariable[];

  // 스타일
  styles: {
    cssFiles: string[];
    designTokens: DesignToken[];
  };

  // 프리뷰
  preview: {
    screenshotPaths: string[];
    previewUrl?: string;
  };
}

export interface SkinFile {
  path: string;
  type: 'layout' | 'module' | 'include';
  description: string;
  dependencies: string[];
}

export interface ModuleVariable {
  code: string;
  description: string;
  usedIn: string[];
}

export interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'shadow';
}

// ============================================================================
// testsprite-orchestrator / playwright 출력 컨텍스트
// ============================================================================

export interface TestContext extends BaseContext {
  type: 'test';

  // 테스트 결과
  results: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  };

  // 상세 결과
  testCases: TestCaseResult[];

  // 커버리지
  coverage: {
    line: number;
    branch: number;
    function: number;
  };

  // 실패 분석
  failures: FailureAnalysis[];

  // 리포트 경로
  reportPaths: {
    html: string;
    json: string;
    junit?: string;
  };
}

export interface FailureAnalysis {
  testId: string;
  testName: string;
  error: string;
  errorType: 'assertion' | 'timeout' | 'element-not-found' | 'network' | 'unknown';
  screenshot?: string;
  suggestedFix?: string;
  healable: boolean;
}

export interface TestPlanContext extends BaseContext {
  type: 'test-plan';

  scenarios: TestScenario[];
  coverage: {
    pages: string[];
    userFlows: string[];
    edgeCases: string[];
  };
  priority: TestPriority[];
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  steps: string[];
  expectedResult: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface TestPriority {
  scenarioId: string;
  reason: string;
  riskIfSkipped: string;
}

export interface TestCodeContext extends BaseContext {
  type: 'test-code';

  generatedFiles: GeneratedFile[];
  testCount: number;
  fixtures: string[];
  pageObjects: string[];
}

export interface HealedTestContext extends BaseContext {
  type: 'healed-test';

  originalFailures: FailureAnalysis[];
  fixes: TestFix[];
  remainingFailures: FailureAnalysis[];
}

export interface TestFix {
  testId: string;
  originalCode: string;
  fixedCode: string;
  fixType: 'selector' | 'timing' | 'assertion' | 'flow';
  explanation: string;
}

// ============================================================================
// cafe24-api-crawler 출력 컨텍스트
// ============================================================================

export interface ApiKnowledgeContext extends BaseContext {
  type: 'api-knowledge';

  // 크롤링된 API 문서
  apis: {
    category: string;
    endpoints: CrawledEndpoint[];
  }[];

  // 지식베이스 저장 위치
  knowledgeBase: {
    vectorStorePath: string;
    indexedAt: string;
    totalDocuments: number;
  };

  // 요약
  summary: {
    totalEndpoints: number;
    categories: string[];
    lastUpdated: string;
  };
}

export interface CrawledEndpoint {
  path: string;
  method: string;
  summary: string;
  parameters: { name: string; type: string; required: boolean }[];
  responseSchema: string;
  requiredScope: string;
}

// ============================================================================
// cafe24-oauth-generator 출력 컨텍스트
// ============================================================================

export interface OAuthContext extends BaseContext {
  type: 'oauth';

  // 생성된 모듈
  module: {
    files: GeneratedFile[];
    entryPoint: string;
  };

  // OAuth 설정
  oauthConfig: {
    clientIdEnv: string;
    clientSecretEnv: string;
    scopes: string[];
    callbackUrl: string;
    tokenEndpoint: string;
    authorizeEndpoint: string;
  };

  // 통합 가이드
  integration: {
    steps: IntegrationStep[];
    exampleCode: string;
  };
}

export interface IntegrationStep {
  order: number;
  title: string;
  description: string;
  codeSnippet?: string;
}

// ============================================================================
// docs-validator 출력 컨텍스트
// ============================================================================

export interface ValidationContext extends BaseContext {
  type: 'validation';

  // 검증 결과
  validation: {
    isValid: boolean;
    score: number;
  };

  // 발견된 이슈
  issues: ValidationIssue[];

  // 문서 간 정합성
  consistency: {
    screenDef: ConsistencyCheck;
    dbDef: ConsistencyCheck;
    apiContract: ConsistencyCheck;
  };

  // 검증된 문서 목록
  documents: {
    path: string;
    type: 'screen-definition' | 'db-definition' | 'api-contract' | 'prd';
    issueCount: number;
  }[];
}

// ============================================================================
// github-issues-expert 출력 컨텍스트
// ============================================================================

export interface IssueContext extends BaseContext {
  type: 'issue';

  // 생성된 마일스톤
  milestones: GitHubMilestone[];

  // 생성된 이슈
  issues: GitHubIssue[];

  // GitHub 링크
  links: {
    milestoneUrl: string;
    projectBoardUrl?: string;
    repositoryUrl: string;
  };

  // 통계
  stats: {
    totalIssues: number;
    byLabel: { [label: string]: number };
    byMilestone: { [milestone: string]: number };
  };
}

// ============================================================================
// 컨텍스트 타입 유니온
// ============================================================================

export type AgentContext =
  | RequirementContext
  | DomainContext
  | PlanningContext
  | ImplementationContext
  | FrontendContext
  | TestContext
  | TestPlanContext
  | TestCodeContext
  | HealedTestContext
  | ApiKnowledgeContext
  | OAuthContext
  | ValidationContext
  | IssueContext;

export type ContextType = AgentContext['type'];

// ============================================================================
// 타입 가드
// ============================================================================

export function isRequirementContext(ctx: BaseContext): ctx is RequirementContext {
  return (ctx as RequirementContext).type === 'requirement';
}

export function isDomainContext(ctx: BaseContext): ctx is DomainContext {
  return (ctx as DomainContext).type === 'domain';
}

export function isPlanningContext(ctx: BaseContext): ctx is PlanningContext {
  return (ctx as PlanningContext).type === 'planning';
}

export function isImplementationContext(ctx: BaseContext): ctx is ImplementationContext {
  return (ctx as ImplementationContext).type === 'implementation';
}

export function isTestContext(ctx: BaseContext): ctx is TestContext {
  return (ctx as TestContext).type === 'test';
}
