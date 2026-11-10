import { SAMPLE_JOBS } from '../data/catalog'
import { EXPECTATIONS } from '../data/expectations'
import { scoreExpectation } from '../data/scoring'
import type { Assessment, Expectation, ScoredExpectation } from '../types'

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 2)
}

export function resolveJobText(a: Assessment): { title: string; description: string } {
  if (a.jobId !== 'custom') {
    const job = SAMPLE_JOBS.find((j) => j.id === a.jobId)
    if (job) return { title: job.title, description: job.description }
  }
  return {
    title: a.customJob.trim() || 'Described job',
    description: a.customJob.trim() || a.metadata.businessProblem,
  }
}

function fitScore(exp: Expectation, a: Assessment): { fit: number; why: string[] } {
  const why: string[] = []
  let fit = 0
  const job = a.jobId !== 'custom' ? SAMPLE_JOBS.find((j) => j.id === a.jobId) : undefined

  if (job?.expectationIds.includes(exp.id)) {
    fit += 6
    why.push('Listed against this sample job in the stage map catalog.')
  }

  const hay = tokens(
    [job?.title, job?.description, a.customJob, a.metadata.businessProblem, a.metadata.description].join(' '),
  )
  const hits = exp.tags.filter((t) => hay.some((h) => h.includes(t) || t.includes(h)))
  if (hits.length) {
    fit += Math.min(4, hits.length)
    why.push(`Job language matches ${hits.slice(0, 3).join(', ')}.`)
  }

  if (exp.departments.includes(a.departmentId)) {
    fit += 2
    why.push('Department typically owns this job.')
  }
  if (exp.industries.length === 0 || exp.industries.includes(a.industryId)) {
    fit += 1
  }

  if (a.timeToValue === '30' && exp.plateau === '<2 yrs') {
    fit += 2
    why.push('Near-term plateau fits a 30-day time-to-value constraint.')
  }
  if (a.timeToValue === '30' && exp.plateau === '5–10 yrs') {
    fit -= 2
    why.push('5–10 year plateau fights a 30-day constraint.')
  }
  if (a.risk === 'low' && (exp.stage === 'Innovation Trigger' || exp.stage === 'Peak of Inflated Expectations')) {
    fit -= 1
    why.push('Low risk appetite on an early-stage expectation.')
  }
  if (a.risk === 'high' && exp.stage === 'Slope of Enlightenment') {
    fit += 2
    why.push('High appetite on a Slope item: this is where incumbents should industrialize.')
  }
  if (a.data === 'none' && (exp.stage === 'Peak of Inflated Expectations' || exp.id === 'domain-genai')) {
    fit -= 1
    why.push('Weak data readiness against a data-hungry item.')
  }
  if (a.rai.sensitiveUseCase && exp.sensitiveDefault) {
    why.push('Sensitive-use default from the stage map.')
  }

  if (why.length === 0) why.push('Weak direct fit; included as a stage-aware contrast.')
  return { fit, why }
}

export function recommend(a: Assessment): ScoredExpectation[] {
  const scored = EXPECTATIONS.map((exp) => {
    const { fit, why } = fitScore(exp, a)
    return scoreExpectation(exp, a, fit, why.join(' '))
  })

  scored.sort((x, y) => y.fit - x.fit || y.valueAdj - x.valueAdj)

  const top: ScoredExpectation[] = []
  const seenStages = new Set<string>()
  for (const row of scored) {
    if (top.length >= 5) break
    if (row.fit <= 0 && top.length >= 3) continue
    top.push(row)
    seenStages.add(row.expectation.stage)
  }

  const must = ['digital-dexterity', 'genai-va', 'ai-washing']
  for (const id of must) {
    if (top.length >= 5) break
    if (top.some((t) => t.expectation.id === id)) continue
    const extra = scored.find((s) => s.expectation.id === id)
    if (extra && extra.fit >= 0) top.push(extra)
  }

  if (![...seenStages].includes('Slope of Enlightenment')) {
    const slope = scored.find((s) => s.expectation.stage === 'Slope of Enlightenment')
    if (slope && !top.some((t) => t.expectation.id === slope.expectation.id) && top.length < 6) {
      top.push(slope)
    }
  }

  return top.slice(0, 5)
}

export function agencyLabel(a: Expectation['agency']): string {
  switch (a) {
    case 'human':
      return 'Human'
    case 'team':
      return 'Team'
    case 'agent':
      return 'Agent'
    case 'enterprise':
      return 'Enterprise'
    case 'human-in-loop':
      return 'Human-in-the-loop'
  }
}
