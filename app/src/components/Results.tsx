import { QUADRANT_BLURB } from '../data/scoring'
import { agencyLabel } from '../lib/recommend'
import type { Assessment, ScoredExpectation } from '../types'
import { MatrixPlot } from './MatrixPlot'

function pillClass(q: ScoredExpectation['quadrant']): string {
  if (q === 'QUICK WINS') return 'pill qw'
  if (q === 'MAJOR PROJECTS') return 'pill mp'
  if (q === 'BACK LOG FILLER WORK') return 'pill bf'
  return 'pill pk'
}

export function Results({
  items,
  assessment,
  jobTitle,
  onBack,
  onRestart,
}: {
  items: ScoredExpectation[]
  assessment: Assessment
  jobTitle: string
  onBack: () => void
  onRestart: () => void
}) {
  return (
    <div>
      <p className="kicker">Results · sample data · July 2026 stage map</p>
      <h1>Stage-aware brief for this job</h1>
      <p className="lede">
        {jobTitle}. Scores start from your sliders, then the Hype Cycle stage changes them. Peak
        discounts value. Trough and Trigger add effort honesty. Sensitive use without an impact
        assessment is forced to PARK.
      </p>

      <div className="two-col">
        <div className="panel">
          <h2>Value vs effort</h2>
          <p className="hint">
            Each numbered point is a recommended expectation. Placement uses adjusted 0–9 sums, not
            the vendor story.
          </p>
          <MatrixPlot items={items} />
          <p className="hint">
            Raw sliders: value {assessment.value.internalCostReduction + assessment.value.marketOpportunity + assessment.value.anticipatedUsers}
            /9 · effort {assessment.effort.dataGaps + assessment.effort.solutionComplexity + assessment.effort.timeToImplement}
            /9
          </p>
        </div>
        <div className="panel">
          <h2>Your scored sliders</h2>
          <p className="score-readout">Business Value (sum of 0–3)</p>
          <ul className="tight">
            <li>Internal cost reduction: {assessment.value.internalCostReduction}</li>
            <li>Market opportunity: {assessment.value.marketOpportunity}</li>
            <li>Number of anticipated users: {assessment.value.anticipatedUsers}</li>
          </ul>
          <p className="score-readout">Implementation Effort (sum of 0–3)</p>
          <ul className="tight">
            <li>Data gaps: {assessment.effort.dataGaps}</li>
            <li>Solution complexity: {assessment.effort.solutionComplexity}</li>
            <li>Time to implement: {assessment.effort.timeToImplement}</li>
          </ul>
          <p className="score-readout">Responsible AI</p>
          <ul className="tight">
            <li>Impact assessment: {assessment.rai.impactAssessment ? 'done' : 'not done'}</li>
            <li>Sensitive use case: {assessment.rai.sensitiveUseCase ? 'yes' : 'no'}</li>
          </ul>
        </div>
      </div>

      {items.map((item, i) => (
        <article className="rec" key={item.expectation.id} aria-labelledby={`rec-${item.expectation.id}`}>
          <p className="kicker">
            Recommendation {i + 1} · {item.expectation.stage}
            {item.expectation.boundary ? ' · boundary' : ''}
          </p>
          <h2 id={`rec-${item.expectation.id}`}>{item.expectation.name}</h2>
          <div className="meta-row">
            <span className={pillClass(item.quadrant)}>{item.quadrant}</span>
            <span className="pill">{item.expectation.plateau} to plateau</span>
            <span className="pill">{agencyLabel(item.expectation.agency)}</span>
            <span>
              Adjusted value {item.valueAdj} / effort {item.effortAdj}
              {item.forcedPark ? ' · forced park' : ''}
            </span>
          </div>
          <p>
            <strong>Job it resolves. </strong>
            {item.expectation.job}
          </p>
          <p>
            <strong>Agency. </strong>
            {item.expectation.agencyNote}
          </p>
          <p>
            <strong>Why this stage. </strong>
            {item.expectation.adoption}
          </p>
          <p className="hint">{item.why}</p>
          <p>
            <strong>Move. </strong>
            {item.move} {QUADRANT_BLURB[item.quadrant]}
          </p>
          <div className="days">
            <div>
              <strong>30 days</strong>
              {item.expectation.day30}
            </div>
            <div>
              <strong>60 days</strong>
              {item.expectation.day60}
            </div>
            <div>
              <strong>90 days</strong>
              {item.expectation.day90}
            </div>
          </div>
          <p>
            <strong>Anti-patterns for this stage</strong>
          </p>
          <ul className="tight">
            {item.expectation.antiPatterns.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>
            <strong>Stage scoring applied</strong>
          </p>
          <ul className="tight">
            {item.modifiers.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </article>
      ))}

      <div className="actions">
        <button type="button" className="ghost" onClick={onBack}>
          Back to scoring
        </button>
        <button type="button" className="primary" onClick={onRestart}>
          New assessment
        </button>
      </div>
    </div>
  )
}
