import { useMemo, useState } from 'react'
import { Results } from './components/Results'
import { DEPARTMENTS, INDUSTRIES, SAMPLE_JOBS } from './data/catalog'
import { defaultsFromConstraints } from './data/scoring'
import { recommend, resolveJobText } from './lib/recommend'
import type {
  Assessment,
  DataReadiness,
  RiskAppetite,
  SkillReadiness,
  TimeToValue,
} from './types'

const STEPS = [
  'Brief',
  'Industry',
  'Department',
  'Job',
  'Constraints',
  'Score',
  'Results',
] as const

const empty: Assessment = {
  industryId: '',
  departmentId: '',
  jobId: '',
  customJob: '',
  risk: 'moderate',
  data: 'partial',
  skills: 'mixed',
  timeToValue: '90',
  metadata: {
    name: '',
    description: '',
    businessProblem: '',
    owner: '',
    primaryPersona: '',
    numberOfUsers: '50–500',
  },
  effort: { dataGaps: 2, solutionComplexity: 2, timeToImplement: 2 },
  value: { internalCostReduction: 2, marketOpportunity: 1, anticipatedUsers: 2 },
  valueQual: {
    costReduction: true,
    securityRisk: false,
    employeeProductivity: true,
    revenueGrowth: false,
    qualityImprovement: false,
    experience: false,
  },
  effortQual: { dataAvailability: false, modelSkillEase: false, timeKnown: true },
  rai: { impactAssessment: false, sensitiveUseCase: false },
}

function applyJobMetadata(a: Assessment): Assessment {
  const job = resolveJobText(a)
  const dept = DEPARTMENTS.find((d) => d.id === a.departmentId)
  const ind = INDUSTRIES.find((i) => i.id === a.industryId)
  const seeded = defaultsFromConstraints(a)
  return {
    ...a,
    metadata: {
      name: a.metadata.name || job.title,
      description: a.metadata.description || job.description,
      businessProblem: a.metadata.businessProblem || job.description,
      owner: a.metadata.owner || (dept ? `${dept.name} lead` : 'Named owner'),
      primaryPersona: a.metadata.primaryPersona || dept?.name || 'Operator',
      numberOfUsers: a.metadata.numberOfUsers,
    },
    effort: seeded.effort,
    value: {
      ...seeded.value,
      marketOpportunity: ind?.id === 'fs' || ind?.id === 'health' ? 2 : seeded.value.marketOpportunity,
    },
  }
}

export default function App() {
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Assessment>(empty)
  const [seeded, setSeeded] = useState(false)
  const [err, setErr] = useState('')

  const jobs = useMemo(() => {
    const primary = SAMPLE_JOBS.filter(
      (j) =>
        (!a.departmentId || j.departmentId === a.departmentId) &&
        (!a.industryId || j.industryId === 'any' || j.industryId === a.industryId),
    )
    if (primary.length >= 2) return primary
    const extra = SAMPLE_JOBS.filter(
      (j) => j.industryId === a.industryId && !primary.includes(j),
    )
    return [...primary, ...extra]
  }, [a.industryId, a.departmentId])

  const canResults = Boolean(
    a.industryId &&
      a.departmentId &&
      (a.jobId === 'custom' ? a.customJob.trim().length > 8 : a.jobId) &&
      a.metadata.name.trim() &&
      a.metadata.owner.trim(),
  )

  const recs = useMemo(() => (step === 6 && canResults ? recommend(a) : []), [step, a, canResults])
  const jobText = resolveJobText(a)

  function go(next: number) {
    setErr('')
    if (next > step) {
      if (step === 1 && !a.industryId) return setErr('Pick an industry vertical.')
      if (step === 2 && !a.departmentId) return setErr('Pick a department.')
      if (step === 3 && !(a.jobId === 'custom' ? a.customJob.trim().length > 8 : a.jobId)) {
        return setErr('Pick a job or describe one in a sentence.')
      }
      if (step === 4 && !seeded) {
        setA((prev) => applyJobMetadata(prev))
        setSeeded(true)
      }
      if (step === 5 && !canResults) {
        return setErr('Name, owner, and a job are required metadata before results.')
      }
    }
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    setA(empty)
    setStep(0)
    setSeeded(false)
    setErr('')
  }

  return (
    <>
      <a className="skip" href="#main">
        Skip to assessment
      </a>
      <header className="topbar">
        <p className="brand">
          Workfit <span>assessment</span>
        </p>
        <p className="sample-flag">Sample data · no secrets · July 2026 map</p>
      </header>

      <nav aria-label="Assessment steps">
        <ol className="stepper">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                aria-current={i === step ? 'step' : undefined}
                disabled={i > step}
                onClick={() => go(i)}
              >
                {i + 1}. {label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <main id="main">
        {step === 0 && (
          <section>
            <p className="kicker">Assessment as ideation</p>
            <h1>Map a job to the Future of Work curve, then score it like a portfolio.</h1>
            <p className="lede">
              For incumbent operators who want more agility. You name a vertical, a department, and a
              concrete job. Workfit maps that job onto the July 2026 Gartner Hype Cycle expectations,
              then scores each recommendation on the Evaluating AI Opportunities matrix. Stage changes
              the score. Peak inflates value. Trough needs effort honesty.
            </p>
            <div className="grid-2">
              <div className="panel">
                <h2>What you will leave with</h2>
                <ul className="tight">
                  <li>Three to five expectations from the stage map, not generic AI advice</li>
                  <li>Agency model: human, team, agent, or enterprise</li>
                  <li>A 0–9 / 0–9 plot: Quick wins, Major projects, Back log filler, Park</li>
                  <li>30 / 60 / 90 day moves and stage anti-patterns</li>
                </ul>
              </div>
              <div className="panel">
                <h2>How scoring works</h2>
                <p>
                  Business Value is Internal cost reduction + Market opportunity + Anticipated users
                  (each 0–3). Implementation Effort is Data gaps + Solution complexity + Time to
                  implement (each 0–3). Responsible AI can force PARK. Hype Cycle stage then adjusts
                  the plotted point.
                </p>
              </div>
            </div>
            <div className="actions">
              <button type="button" className="primary" onClick={() => go(1)}>
                Start with industry
              </button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <p className="kicker">Step 1 of 6</p>
            <h1>Industry vertical</h1>
            <p className="lede">Where the job lives. This biases matching; it does not invent technologies.</p>
            <div className="grid-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  className="choice"
                  aria-pressed={a.industryId === ind.id}
                  onClick={() => setA({ ...a, industryId: ind.id })}
                >
                  <strong>{ind.name}</strong>
                  <span>{ind.blurb}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <p className="kicker">Step 2 of 6</p>
            <h1>Department</h1>
            <p className="lede">Who owns the job on Monday morning.</p>
            <div className="grid-2">
              {DEPARTMENTS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className="choice"
                  aria-pressed={a.departmentId === d.id}
                  onClick={() => setA({ ...a, departmentId: d.id })}
                >
                  <strong>{d.name}</strong>
                  <span>{d.blurb}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <p className="kicker">Step 3 of 6</p>
            <h1>Job to be done</h1>
            <p className="lede">
              Pick a sample job for this department, or describe the task and the tool it currently
              lives in. We map the job, not the vendor.
            </p>
            <div className="grid-2">
              {jobs.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  className="choice"
                  aria-pressed={a.jobId === j.id}
                  onClick={() => setA({ ...a, jobId: j.id, customJob: '' })}
                >
                  <strong>{j.title}</strong>
                  <span>{j.description}</span>
                </button>
              ))}
              <button
                type="button"
                className="choice"
                aria-pressed={a.jobId === 'custom'}
                onClick={() => setA({ ...a, jobId: 'custom' })}
              >
                <strong>Describe a job</strong>
                <span>Write the outcome a person is hired to complete.</span>
              </button>
            </div>
            {a.jobId === 'custom' && (
              <label className="field">
                <span>Job in one or two sentences</span>
                <textarea
                  value={a.customJob}
                  onChange={(e) => setA({ ...a, customJob: e.target.value })}
                  placeholder="Example: Clear a claims exception using the notes already in the file, with a human signing anything irreversible."
                />
              </label>
            )}
          </section>
        )}

        {step === 4 && (
          <section>
            <p className="kicker">Step 4 of 6</p>
            <h1>Constraints</h1>
            <p className="lede">
              Risk, data, skills, and time-to-value seed the 0–3 sliders on the next step. You can
              still override every score.
            </p>
            <div className="panel">
              <h2>Risk appetite</h2>
              <div className="grid-3">
                {(
                  [
                    ['low', 'Low: controls first, peak items discounted harder'],
                    ['moderate', 'Moderate: probes allowed with a kill date'],
                    ['high', 'High: industrialize Slope items, still no theatre'],
                  ] as [RiskAppetite, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="choice"
                    aria-pressed={a.risk === id}
                    onClick={() => setA({ ...a, risk: id })}
                  >
                    <strong>{id}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="panel">
              <h2>Data availability and AI readiness</h2>
              <div className="grid-3">
                {(
                  [
                    ['none', 'None: data gaps score 3'],
                    ['partial', 'Partial: data gaps score 2'],
                    ['ready', 'Ready: data gaps score 0'],
                  ] as [DataReadiness, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="choice"
                    aria-pressed={a.data === id}
                    onClick={() => setA({ ...a, data: id })}
                  >
                    <strong>{id}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="panel">
              <h2>Model and skill ease of adoption</h2>
              <div className="grid-3">
                {(
                  [
                    ['scarce', 'Scarce: complexity 3'],
                    ['mixed', 'Mixed: complexity 2'],
                    ['ready', 'Ready: complexity 1'],
                  ] as [SkillReadiness, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="choice"
                    aria-pressed={a.skills === id}
                    onClick={() => setA({ ...a, skills: id })}
                  >
                    <strong>{id}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="panel">
              <h2>Time to implement / time-to-value</h2>
              <div className="grid-3">
                {(
                  [
                    ['30', '30 days: time-to-implement 1, fights 5–10 year items'],
                    ['90', '90 days: time-to-implement 2'],
                    ['365', 'A year: time-to-implement 3'],
                  ] as [TimeToValue, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="choice"
                    aria-pressed={a.timeToValue === id}
                    onClick={() => setA({ ...a, timeToValue: id })}
                  >
                    <strong>{id} days</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 5 && (
          <section>
            <p className="kicker">Step 5 of 6 · scoring model</p>
            <h1>Evaluate the opportunity</h1>
            <p className="lede">
              Four lenses from Evaluating AI Opportunities. Sliders are 0 (low) to 3 (high). Value
              and effort each sum to 0–9 and become the plot.
            </p>

            <div className="panel">
              <h2>Metadata</h2>
              <label className="field">
                <span>Name</span>
                <input
                  value={a.metadata.name}
                  onChange={(e) => setA({ ...a, metadata: { ...a.metadata, name: e.target.value } })}
                />
              </label>
              <label className="field">
                <span>Description</span>
                <textarea
                  value={a.metadata.description}
                  onChange={(e) =>
                    setA({ ...a, metadata: { ...a.metadata, description: e.target.value } })
                  }
                />
              </label>
              <label className="field">
                <span>Business problem</span>
                <textarea
                  value={a.metadata.businessProblem}
                  onChange={(e) =>
                    setA({ ...a, metadata: { ...a.metadata, businessProblem: e.target.value } })
                  }
                />
              </label>
              <div className="grid-2">
                <label className="field">
                  <span>Owner</span>
                  <input
                    value={a.metadata.owner}
                    onChange={(e) =>
                      setA({ ...a, metadata: { ...a.metadata, owner: e.target.value } })
                    }
                  />
                </label>
                <label className="field">
                  <span>Primary persona</span>
                  <input
                    value={a.metadata.primaryPersona}
                    onChange={(e) =>
                      setA({ ...a, metadata: { ...a.metadata, primaryPersona: e.target.value } })
                    }
                  />
                </label>
              </div>
              <label className="field">
                <span>Number of users</span>
                <select
                  value={a.metadata.numberOfUsers}
                  onChange={(e) =>
                    setA({ ...a, metadata: { ...a.metadata, numberOfUsers: e.target.value } })
                  }
                >
                  <option>&lt;50</option>
                  <option>50–500</option>
                  <option>500–5000</option>
                  <option>5000+</option>
                </select>
              </label>
            </div>

            <div className="panel">
              <h2>Business value (qualitative)</h2>
              {(
                [
                  ['costReduction', 'Cost reduction'],
                  ['securityRisk', 'Security / risk management'],
                  ['employeeProductivity', 'Employee productivity'],
                  ['revenueGrowth', 'Revenue growth'],
                  ['qualityImprovement', 'Quality improvement'],
                  ['experience', 'Employee / customer experience'],
                ] as const
              ).map(([key, label]) => (
                <label className="check" key={key}>
                  <input
                    type="checkbox"
                    checked={a.valueQual[key]}
                    onChange={(e) =>
                      setA({ ...a, valueQual: { ...a.valueQual, [key]: e.target.checked } })
                    }
                  />
                  <span>{label}</span>
                </label>
              ))}
              <h3>Scored 0–3</h3>
              <Slider
                label="Internal cost reduction"
                value={a.value.internalCostReduction}
                onChange={(n) => setA({ ...a, value: { ...a.value, internalCostReduction: n } })}
              />
              <Slider
                label="Market opportunity"
                value={a.value.marketOpportunity}
                onChange={(n) => setA({ ...a, value: { ...a.value, marketOpportunity: n } })}
              />
              <Slider
                label="Number of anticipated users"
                value={a.value.anticipatedUsers}
                onChange={(n) => setA({ ...a, value: { ...a.value, anticipatedUsers: n } })}
              />
              <p className="score-readout">
                Business value sum: {a.value.internalCostReduction + a.value.marketOpportunity + a.value.anticipatedUsers} / 9
              </p>
            </div>

            <div className="panel">
              <h2>Implementation effort (qualitative)</h2>
              <label className="check">
                <input
                  type="checkbox"
                  checked={a.effortQual.dataAvailability}
                  onChange={(e) =>
                    setA({
                      ...a,
                      effortQual: { ...a.effortQual, dataAvailability: e.target.checked },
                    })
                  }
                />
                <span>Data availability and AI readiness are sufficient for a first slice</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={a.effortQual.modelSkillEase}
                  onChange={(e) =>
                    setA({
                      ...a,
                      effortQual: { ...a.effortQual, modelSkillEase: e.target.checked },
                    })
                  }
                />
                <span>Model / skill ease of adoption is acceptable for this team</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={a.effortQual.timeKnown}
                  onChange={(e) =>
                    setA({ ...a, effortQual: { ...a.effortQual, timeKnown: e.target.checked } })
                  }
                />
                <span>Time to implement is known well enough to score</span>
              </label>
              <h3>Scored 0–3</h3>
              <Slider
                label="Data gaps"
                value={a.effort.dataGaps}
                onChange={(n) => setA({ ...a, effort: { ...a.effort, dataGaps: n } })}
              />
              <Slider
                label="Solution complexity"
                value={a.effort.solutionComplexity}
                onChange={(n) => setA({ ...a, effort: { ...a.effort, solutionComplexity: n } })}
              />
              <Slider
                label="Time to implement"
                value={a.effort.timeToImplement}
                onChange={(n) => setA({ ...a, effort: { ...a.effort, timeToImplement: n } })}
              />
              <p className="score-readout">
                Implementation effort sum: {a.effort.dataGaps + a.effort.solutionComplexity + a.effort.timeToImplement} / 9
              </p>
            </div>

            <div className="panel">
              <h2>Responsible AI</h2>
              <label className="check">
                <input
                  type="checkbox"
                  checked={a.rai.impactAssessment}
                  onChange={(e) => setA({ ...a, rai: { ...a.rai, impactAssessment: e.target.checked } })}
                />
                <span>Impact assessment done</span>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  checked={a.rai.sensitiveUseCase}
                  onChange={(e) => setA({ ...a, rai: { ...a.rai, sensitiveUseCase: e.target.checked } })}
                />
                <span>Sensitive use case</span>
              </label>
              <p className="hint">
                A sensitive use case without an impact assessment cannot plot as QUICK WINS.
              </p>
            </div>
          </section>
        )}

        {step === 6 && (
          <Results
            items={recs}
            assessment={a}
            jobTitle={jobText.title}
            onBack={() => go(5)}
            onRestart={restart}
          />
        )}

        {err && (
          <p className="error" role="alert">
            {err}
          </p>
        )}

        {step > 0 && step < 6 && (
          <div className="actions">
            <button type="button" className="ghost" onClick={() => go(step - 1)}>
              Back
            </button>
            <button type="button" className="primary" onClick={() => go(step + 1)}>
              {step === 5 ? 'See recommendations' : 'Continue'}
            </button>
          </div>
        )}
      </main>

      <footer className="site">
        Grounded in the July 2026 Gartner Hype Cycle for the Future of Work and the Evaluating AI
        Opportunities matrix. Plateau of Productivity has no labeled items. Workfit runs on sample
        data in this environment.
      </footer>
    </>
  )
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (n: number) => void
}) {
  const id = label.replace(/\s+/g, '-').toLowerCase()
  return (
    <div className="slider">
      <label htmlFor={id}>
        {label} <span className="hint">Low 0 to High 3</span>
      </label>
      <output htmlFor={id} aria-live="polite">
        {value}
      </output>
      <input
        id={id}
        type="range"
        min={0}
        max={3}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
