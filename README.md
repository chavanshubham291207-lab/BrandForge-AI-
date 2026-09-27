# BrandForge AI
Turn a rough idea into a launch-ready brand via a 6-stage multi-step AI workflow.

## Problem Statement
Most AI brand generators use a single prompt to output generic, clichéd results (e.g., "AI-powered platform"). This tool fixes that by utilizing a 6-stage pipeline where each step builds on the context of the previous step. It critiques its own output, assigns a genericity score, and automatically refines ideas before finalizing the brand kit.

## The 6-Stage AI Workflow
1. **Discover**: Interrogates the rough idea to find the REAL problem and audience.
2. **Position**: Defines category, value proposition, and competitive angle.
3. **Shape**: Creates personality traits, names, taglines, and voice guidelines.
4. **Visualize**: Defines typography, colors, mood, and symbols.
5. **Challenge**: The "Anti-Generic Engine". Critiques the entire system, scoring genericity and consistency.
6. **Deliver**: Prepares launch assets like headlines, social posts, and next steps.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS & shadcn/ui
- Zustand
- OpenAI SDK (gpt-4o-mini)
- Zod (Schema Validation)
- Framer Motion

## Setup Instructions
1. Clone this repository.
2. Run \`npm install\` to install dependencies.
3. Copy \`.env.example\` to \`.env.local\` and add your \`OPENAI_API_KEY\`.
4. Run \`npm run dev\` to start the development server.

## How the Anti-Generic Engine Works
The Challenge stage acts as a ruthless critic. It scores the genericity (0-100) and consistency (0-100) of the brand. If the genericity score is too high (> 60), the tool can auto-refine the brand by re-running the Shape and Visualize stages with the critic's feedback in context.
