# Workfit

Assessment-as-ideation for incumbent enterprises that want more agility.

Pick an industry, department, and job. Workfit maps that job onto labeled expectations from the July 2026 Gartner Hype Cycle for the Future of Work, then scores each recommendation with the Evaluating AI Opportunities matrix (Metadata, Implementation Effort, Business Value, Responsible AI). Hype Cycle stage changes the plotted score.

Runs on sample data. No secrets required.

## Run locally

```bash
cd app
npm install
npm run dev
```

Open http://127.0.0.1:5173

## Build

```bash
npm run build
npm run preview
```

## Grounding

Recommendations are the chart labels only. Plateau of Productivity has no labeled items. Stage modifiers: Trigger discounts value and adds effort; Peak discounts value harder; Trough adds effort honesty; Slope trusts the scores.
