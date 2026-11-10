import type { Department, Industry, SampleJob } from '../types'

export const INDUSTRIES: Industry[] = [
  { id: 'fs', name: 'Financial services', blurb: 'Risk, claims, advice, and regulated operations.' },
  { id: 'health', name: 'Healthcare', blurb: 'Clinical, access, and revenue-cycle work.' },
  { id: 'mfg', name: 'Manufacturing', blurb: 'Plant, quality, and maintenance work.' },
  { id: 'retail', name: 'Retail & consumer', blurb: 'Store, supply, and customer operations.' },
  { id: 'public', name: 'Public sector', blurb: 'Citizen services with audit and equity constraints.' },
  { id: 'pro', name: 'Professional services', blurb: 'Delivery, knowledge, and client work.' },
  { id: 'energy', name: 'Energy & utilities', blurb: 'Field ops, safety, and asset work.' },
  { id: 'log', name: 'Logistics', blurb: 'Move, exception, and network work.' },
  { id: 'telco', name: 'Telecom', blurb: 'Care, network, and field work.' },
  { id: 'edu', name: 'Higher education', blurb: 'Student, research, and admin work.' },
]

export const DEPARTMENTS: Department[] = [
  { id: 'ops', name: 'Operations', blurb: 'Throughput, exceptions, and handoffs.' },
  { id: 'care', name: 'Customer service', blurb: 'Resolve intent, then prove it happened.' },
  { id: 'hr', name: 'People / HR', blurb: 'Skills, coaching, and role redesign.' },
  { id: 'fin', name: 'Finance', blurb: 'Close, control, and forecast.' },
  { id: 'it', name: 'IT / digital workplace', blurb: 'Identity, tools, and agent control plane.' },
  { id: 'sales', name: 'Sales', blurb: 'Prep, follow-up, and judgment under quota.' },
  { id: 'risk', name: 'Legal / risk / audit', blurb: 'Filter theatre, keep evidence.' },
  { id: 'product', name: 'Product / engineering', blurb: 'Ship thin slices without a quality bill.' },
  { id: 'supply', name: 'Supply chain', blurb: 'Plan, replenish, and explain the call.' },
  { id: 'frontline', name: 'Frontline / clinical / field', blurb: 'Work away from a desk.' },
]

export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: 'recon',
    title: 'Close the period without a reconciliation pile',
    description:
      'Finance needs to match exceptions, draft the narrative, and leave an audit trail a human will still sign.',
    industryId: 'fs',
    departmentId: 'fin',
    expectationIds: ['decision-intelligence', 'genai', 'prompt-library', 'cognitive-offload'],
  },
  {
    id: 'fraud',
    title: 'Resolve a fraud or claims alert in one sitting',
    description:
      'A specialist must pull context, act in the system of record, and hand off the irreversible step to a named human.',
    industryId: 'fs',
    departmentId: 'care',
    expectationIds: ['genai-va', 'cui', 'agents', 'agent-identity'],
  },
  {
    id: 'avs',
    title: 'Draft the after-visit summary from notes and protocol',
    description:
      'Clinicians need a first draft that matches house protocol, then a human who remains accountable for the chart.',
    industryId: 'health',
    departmentId: 'frontline',
    expectationIds: ['genai', 'domain-genai', 'toolmate', 'digital-coaching'],
  },
  {
    id: 'access',
    title: 'Get a patient or citizen to the right next action',
    description:
      'Access staff need intent resolved without a portal scavenger hunt, with a human fallback that actually works.',
    industryId: 'health',
    departmentId: 'care',
    expectationIds: ['cui', 'genai-va', 'everyday-ai', 'guided-attention'],
  },
  {
    id: 'sop',
    title: 'Put the next procedure at the machine or bedside',
    description:
      'A technician needs the right step in the environment they already occupy, not another login.',
    industryId: 'mfg',
    departmentId: 'frontline',
    expectationIds: ['zero-ui', 'wearables', 'embodied', 'guided-attention'],
  },
  {
    id: 'quality',
    title: 'Catch a quality exception from photos and notes',
    description:
      'Quality wants to use the evidence already on the floor, not only what someone typed into a form.',
    industryId: 'mfg',
    departmentId: 'ops',
    expectationIds: ['multimodal', 'decision-intelligence', 'workstyle'],
  },
  {
    id: 'store',
    title: 'Cover more customer conversations without fake presence',
    description:
      'Store and care leaders want coverage, not an avatar pretending a colleague is in the room.',
    industryId: 'retail',
    departmentId: 'care',
    expectationIds: ['genai-va', 'cui', 'employee-twin', 'avatar'],
  },
  {
    id: 'citizen',
    title: 'Complete a case with an evidence trail a court could read',
    description:
      'Case workers need generation that cites the file, with agent identity and a human who can still explain why.',
    industryId: 'public',
    departmentId: 'ops',
    expectationIds: ['decision-intelligence', 'agent-identity', 'genai', 'prompt-context'],
  },
  {
    id: 'proposal',
    title: 'Turn last quarter’s delivery into this week’s proposal draft',
    description:
      'A partner needs a first-good-draft that sounds like the firm, not a public model, with a human editor.',
    industryId: 'pro',
    departmentId: 'sales',
    expectationIds: ['toolmate', 'domain-genai', 'prompt-library', 'human-insight'],
  },
  {
    id: 'field',
    title: 'Get a field crew through an uncommon repair',
    description:
      'Crews need procedure, warning, and a record at the body, with safety remaining a human job.',
    industryId: 'energy',
    departmentId: 'frontline',
    expectationIds: ['wearables', 'zero-ui', 'digital-coaching', 'embodied'],
  },
  {
    id: 'exception',
    title: 'Clear a network exception before it becomes a miss',
    description:
      'Planners need attention pointed at the stall that changes the outcome, then a decision with a record.',
    industryId: 'log',
    departmentId: 'supply',
    expectationIds: ['guided-attention', 'decision-intelligence', 'workstyle', 'genai-va'],
  },
  {
    id: 'care-telco',
    title: 'Finish a retention or repair request across seven apps',
    description:
      'Agents need an assistant that can act in a few systems, with identity, logging, and a kill switch.',
    industryId: 'telco',
    departmentId: 'care',
    expectationIds: ['genai-va', 'agents', 'agent-identity', 'ha-workspace'],
  },
  {
    id: 'skills',
    title: 'Know who can do this job with this stack next quarter',
    description:
      'People leaders need skills currency from demonstrated work, not a badge graph.',
    industryId: 'any',
    departmentId: 'hr',
    expectationIds: ['skills-currency', 'ai-literacy', 'digital-dexterity', 'digital-coaching'],
  },
  {
    id: 'vendor',
    title: 'Stop funding AI theatre this budget cycle',
    description:
      'Risk and IT need a filter that names data, owner, and kill criteria before a suite is signed.',
    industryId: 'any',
    departmentId: 'risk',
    expectationIds: ['ai-washing', 'exec-fluency', 'agent-identity', 'perfect-prompt'],
  },
  {
    id: 'slice',
    title: 'Shape a thin slice of this workflow this week',
    description:
      'A digital team needs to go from intent to a reviewed slice without skipping tests.',
    industryId: 'any',
    departmentId: 'product',
    expectationIds: ['vibe-coding', 'fwd-engineer', 'no-code-agents', 'prompt-context'],
  },
  {
    id: 'copilot-fatigue',
    title: 'Make Tuesday faster without another copilot rollout',
    description:
      'Everyday AI disappointed. Keep the tools that show up in real artifacts and retire the rest.',
    industryId: 'any',
    departmentId: 'it',
    expectationIds: ['everyday-ai', 'digital-dexterity', 'genai', 'toolmate'],
  },
  {
    id: 'lead',
    title: 'Lead a mixed human-AI team without a deputy model',
    description:
      'A manager needs machine help as reviewer and sounding board, while remaining the decision maker.',
    industryId: 'any',
    departmentId: 'ops',
    expectationIds: ['aug-leadership', 'exec-fluency', 'ai-literacy', 'emotion-ai'],
  },
  {
    id: 'practice',
    title: 'Rehearse the high-stakes conversation before it is live',
    description:
      'People need a gym for scarce skills, tied to a real skill currency, not a demo scenario pack.',
    industryId: 'any',
    departmentId: 'hr',
    expectationIds: ['simulators', 'digital-coaching', 'employee-twin', 'cyberpsychology'],
  },
]
