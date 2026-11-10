export type Stage =
  | 'Innovation Trigger'
  | 'Peak of Inflated Expectations'
  | 'Trough of Disillusionment'
  | 'Slope of Enlightenment'

export type Plateau = '<2 yrs' | '2–5 yrs' | '5–10 yrs'

export type Agency = 'human' | 'team' | 'agent' | 'enterprise' | 'human-in-loop'

export type Quadrant =
  | 'QUICK WINS'
  | 'MAJOR PROJECTS'
  | 'BACK LOG FILLER WORK'
  | 'PARK'

export type RiskAppetite = 'low' | 'moderate' | 'high'
export type DataReadiness = 'none' | 'partial' | 'ready'
export type SkillReadiness = 'scarce' | 'mixed' | 'ready'
export type TimeToValue = '30' | '90' | '365'

export interface Expectation {
  id: string
  name: string
  stage: Stage
  plateau: Plateau
  boundary?: string
  job: string
  agency: Agency
  agencyNote: string
  adoption: string
  antiPatterns: string[]
  tags: string[]
  departments: string[]
  industries: string[]
  sensitiveDefault: boolean
  day30: string
  day60: string
  day90: string
}

export interface SampleJob {
  id: string
  title: string
  description: string
  industryId: string | 'any'
  departmentId: string
  expectationIds: string[]
}

export interface Industry {
  id: string
  name: string
  blurb: string
}

export interface Department {
  id: string
  name: string
  blurb: string
}

export interface Metadata {
  name: string
  description: string
  businessProblem: string
  owner: string
  primaryPersona: string
  numberOfUsers: string
}

export interface EffortScores {
  dataGaps: number
  solutionComplexity: number
  timeToImplement: number
}

export interface ValueScores {
  internalCostReduction: number
  marketOpportunity: number
  anticipatedUsers: number
}

export interface ValueQualitative {
  costReduction: boolean
  securityRisk: boolean
  employeeProductivity: boolean
  revenueGrowth: boolean
  qualityImprovement: boolean
  experience: boolean
}

export interface EffortQualitative {
  dataAvailability: boolean
  modelSkillEase: boolean
  timeKnown: boolean
}

export interface ResponsibleAI {
  impactAssessment: boolean
  sensitiveUseCase: boolean
}

export interface Assessment {
  industryId: string
  departmentId: string
  jobId: string | 'custom'
  customJob: string
  risk: RiskAppetite
  data: DataReadiness
  skills: SkillReadiness
  timeToValue: TimeToValue
  metadata: Metadata
  effort: EffortScores
  value: ValueScores
  valueQual: ValueQualitative
  effortQual: EffortQualitative
  rai: ResponsibleAI
}

export interface ScoredExpectation {
  expectation: Expectation
  fit: number
  why: string
  valueRaw: number
  effortRaw: number
  valueAdj: number
  effortAdj: number
  valueParts: ValueScores
  effortParts: EffortScores
  quadrant: Quadrant
  forcedPark: boolean
  modifiers: string[]
  move: string
}
