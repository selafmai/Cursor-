import type {
  Assessment,
  EffortScores,
  Expectation,
  Quadrant,
  ScoredExpectation,
  Stage,
  ValueScores,
} from '../types'

export const VALUE_MAX = 9
export const EFFORT_MAX = 9

export function sumValue(v: ValueScores): number {
  return v.internalCostReduction + v.marketOpportunity + v.anticipatedUsers
}

export function sumEffort(e: EffortScores): number {
  return e.dataGaps + e.solutionComplexity + e.timeToImplement
}

export function clip(n: number): number {
  return Math.max(0, Math.min(9, n))
}

export function quadrantOf(value: number, effort: number, forcedPark: boolean): Quadrant {
  if (forcedPark) return 'PARK'
  const highValue = value >= 5
  const highEffort = effort >= 5
  if (highValue && !highEffort) return 'QUICK WINS'
  if (highValue && highEffort) return 'MAJOR PROJECTS'
  if (!highValue && !highEffort) return 'BACK LOG FILLER WORK'
  return 'PARK'
}

export function stageModifiers(stage: Stage): { value: number; effort: number; notes: string[] } {
  switch (stage) {
    case 'Innovation Trigger':
      return {
        value: -1,
        effort: 2,
        notes: [
          'Trigger: value is a hypothesis until a probe produces evidence.',
          'Trigger: add effort for missing data, skills, and identity.',
        ],
      }
    case 'Peak of Inflated Expectations':
      return {
        value: -2,
        effort: 1,
        notes: [
          'Peak: discount claimed value. User counts and market stories run hot.',
          'Peak: add effort for evals, integration, and change.',
        ],
      }
    case 'Trough of Disillusionment':
      return {
        value: 0,
        effort: 2,
        notes: [
          'Trough: do not cut the job because the tool disappointed.',
          'Trough: raise effort honesty for failed pilots, dirty data, and fatigue.',
        ],
      }
    case 'Slope of Enlightenment':
      return {
        value: 0,
        effort: 0,
        notes: ['Slope: scores can be taken more at face value. Skill-up and scale with controls.'],
      }
  }
}

export function defaultsFromConstraints(a: Pick<Assessment, 'data' | 'skills' | 'timeToValue' | 'metadata'>): {
  effort: EffortScores
  value: ValueScores
} {
  const dataGaps = a.data === 'none' ? 3 : a.data === 'partial' ? 2 : 0
  const solutionComplexity = a.skills === 'scarce' ? 3 : a.skills === 'mixed' ? 2 : 1
  const timeToImplement = a.timeToValue === '30' ? 1 : a.timeToValue === '90' ? 2 : 3
  const users = a.metadata.numberOfUsers
  const anticipatedUsers = users === '5000+' || users === '500–5000' ? 3 : users === '50–500' ? 2 : 1
  return {
    effort: { dataGaps, solutionComplexity, timeToImplement },
    value: { internalCostReduction: 2, marketOpportunity: 1, anticipatedUsers },
  }
}

export function scoreExpectation(
  expectation: Expectation,
  assessment: Assessment,
  fit: number,
  why: string,
): ScoredExpectation {
  const valueRaw = sumValue(assessment.value)
  const effortRaw = sumEffort(assessment.effort)
  const stage = stageModifiers(expectation.stage)
  const modifiers = [...stage.notes]
  let valueAdj = valueRaw + stage.value
  let effortAdj = effortRaw + stage.effort

  if (expectation.stage === 'Slope of Enlightenment' && assessment.effortQual.dataAvailability) {
    valueAdj += 1
    modifiers.push('Slope with data readiness: small value credit.')
  }

  if (assessment.rai.sensitiveUseCase || expectation.sensitiveDefault) {
    effortAdj += 1
    modifiers.push('Sensitive use case: +1 implementation effort.')
  }

  const forcedPark =
    (assessment.rai.sensitiveUseCase || expectation.sensitiveDefault) &&
    !assessment.rai.impactAssessment
  if (forcedPark) {
    modifiers.push('Sensitive use case without an impact assessment cannot plot as a quick win. Forced PARK.')
  }

  if (assessment.risk === 'low' && (expectation.stage === 'Innovation Trigger' || expectation.stage === 'Peak of Inflated Expectations')) {
    effortAdj += 1
    modifiers.push('Low risk appetite on an early-stage item: add effort (controls, narrower scope).')
  }

  if (assessment.timeToValue === '30' && expectation.plateau === '5–10 yrs') {
    effortAdj += 1
    modifiers.push('30-day time-to-value on a 5–10 year plateau item: effort is not a quarter.')
  }

  valueAdj = clip(valueAdj)
  effortAdj = clip(effortAdj)
  const quadrant = quadrantOf(valueAdj, effortAdj, forcedPark)

  const move = moveFor(quadrant, expectation)

  return {
    expectation,
    fit,
    why,
    valueRaw,
    effortRaw,
    valueAdj,
    effortAdj,
    valueParts: assessment.value,
    effortParts: assessment.effort,
    quadrant,
    forcedPark,
    modifiers,
    move,
  }
}

function moveFor(q: Quadrant, e: Expectation): string {
  if (q === 'PARK') {
    return `Park ${e.name}. Write the un-park condition (data, assessment, or a different job). Do not keep it on a strategic roadmap.`
  }
  if (q === 'BACK LOG FILLER WORK') {
    return `Allow local use of ${e.name}. No new budget, no executive airtime, no platform RFP.`
  }
  if (q === 'MAJOR PROJECTS') {
    return `Treat ${e.name} as a major project: 60-day foundation (data, identity, skills), 90-day first outcome. Do not start with a suite.`
  }
  return `Treat ${e.name} as a quick win: 30-day production slice, named owner, eval, kill switch.`
}

export const QUADRANT_BLURB: Record<Quadrant, string> = {
  'QUICK WINS': 'High value, low effort. Ship a thin slice with an owner and a kill switch.',
  'MAJOR PROJECTS': 'High value, high effort. Fund foundation, not a platform RFP.',
  'BACK LOG FILLER WORK': 'Low value, low effort. Local use only. Protect executive attention.',
  PARK: 'Low value, high effort, or blocked by Responsible AI. Do not roadmap it as strategic.',
}
