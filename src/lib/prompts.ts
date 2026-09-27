export const PROMPTS = {
  discover: (idea: string) => `You are a senior brand strategist.
The user's rough idea: "${idea}"

Extract high-value insights and return ONLY a valid JSON object matching this exact format:
{
  "problem": "Clear, deep explanation of the real underlying problem",
  "audience": "Precise demographics, psychographics, and mindset",
  "goals": ["Goal 1", "Goal 2", "Goal 3"],
  "constraints": ["Constraint 1", "Constraint 2"],
  "openQuestions": ["Strategic question 1", "Strategic question 2"],
  "refinedIdea": "Sharp, single-sentence articulation of the value proposition"
}`,

  position: (ctx: any) => `You are a positioning strategist.
Given discovery context:
${JSON.stringify(ctx.discover || ctx)}

Define market positioning and return ONLY a valid JSON object matching this exact format:
{
  "category": "Exact category or new subcategory",
  "differentiator": "Core unique mechanism or differentiator",
  "valueProp": "One sharp, unforgettable value proposition",
  "competitiveAngle": "How this wins against legacy or alternative solutions",
  "targetSegment": "The beachhead customer segment"
}`,

  shape: (ctx: any) => `You are a brand personality and naming expert.
Given context:
${JSON.stringify(ctx)}

Generate brand identity and personality. Avoid clichés like 'TeamUp', 'Sync', 'Hub', 'AI-powered'.
Return ONLY a valid JSON object matching this exact format:
{
  "traits": [
    { "trait": "Trait Name", "rationale": "Why this resonates with the audience" },
    { "trait": "Trait Name 2", "rationale": "Why this resonates" },
    { "trait": "Trait Name 3", "rationale": "Why this resonates" },
    { "trait": "Trait Name 4", "rationale": "Why this resonates" }
  ],
  "avoidTraits": ["Trait to avoid 1", "Trait to avoid 2", "Trait to avoid 3"],
  "names": [
    { "name": "BrandName 1", "rationale": "Why it fits", "style": "Invented" },
    { "name": "BrandName 2", "rationale": "Why it fits", "style": "Metaphorical" },
    { "name": "BrandName 3", "rationale": "Why it fits", "style": "Compound" },
    { "name": "BrandName 4", "rationale": "Why it fits", "style": "Evocative" },
    { "name": "BrandName 5", "rationale": "Why it fits", "style": "Direct" }
  ],
  "taglines": ["Tagline 1", "Tagline 2", "Tagline 3", "Tagline 4", "Tagline 5"],
  "voice": {
    "tone": "Core tone description (e.g. Sharp, witty, and grounded)",
    "do": ["Do this in communication 1", "Do this 2", "Do this 3"],
    "dont": ["Don't say this 1", "Don't say this 2", "Don't say this 3"]
  }
}`,

  visualize: (ctx: any) => `You are a visual brand director.
Given brand context:
${JSON.stringify(ctx)}

Define the visual identity system. Return ONLY a valid JSON object matching this exact format:
{
  "typography": {
    "primary": "Primary Heading Font Name",
    "secondary": "Secondary Body Font Name",
    "reason": "Strategic design rationale"
  },
  "colors": [
    { "hex": "#09090b", "name": "Obsidian Black", "usage": "Background & core surfaces" },
    { "hex": "#6366f1", "name": "Electric Indigo", "usage": "Primary brand accent" },
    { "hex": "#10b981", "name": "Vibrant Emerald", "usage": "Success & highlights" },
    { "hex": "#71717a", "name": "Muted Zinc", "usage": "Subtle borders & secondary text" },
    { "hex": "#fafafa", "name": "Pure Crisp", "usage": "Primary typography & high contrast" }
  ],
  "mood": "Overall visual mood & aesthetic feeling",
  "symbols": ["Visual motif 1", "Visual motif 2", "Visual motif 3", "Visual motif 4"],
  "imagery": "Direction for photography, 3D elements, or graphics",
  "avoidVisuals": ["Visual cliché 1", "Visual cliché 2", "Visual cliché 3"]
}`,

  challenge: (ctx: any) => `You are a ruthless brand critic and consistency auditor.
Given the full brand system so far:
${JSON.stringify(ctx)}

Critique clichés, contradictions, and weak points.
Return ONLY a valid JSON object matching this exact format:
{
  "issues": [
    { "type": "Cliché | Contradiction | Audience Mismatch | Weak Assumption", "description": "Specific critique", "severity": "medium" }
  ],
  "genericityScore": 25,
  "consistencyScore": 88,
  "suggestions": [
    "Concrete actionable recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "verdict": "Ready to launch"
}`,

  deliver: (ctx: any) => `You are a launch strategist.
Given the brand system:
${JSON.stringify(ctx)}

Create the launch collateral and return ONLY a valid JSON object matching this exact format:
{
  "brandSummary": "2-3 punchy sentences summarizing the entire brand",
  "landingHeadline": "Punchy hero headline (<12 words)",
  "oneLinePitch": "Clear, memorable one-sentence elevator pitch",
  "socialLaunchPosts": {
    "instagram": "Engaging visual caption with hooks and hashtags",
    "linkedin": "Professional founder story post",
    "twitter": "Viral launch announcement tweet"
  },
  "messagingPillars": [
    "Pillar 1: Core Theme",
    "Pillar 2: Core Theme",
    "Pillar 3: Core Theme",
    "Pillar 4: Core Theme"
  ],
  "nextSteps": [
    "First step to execute",
    "Second step to execute",
    "Third step to execute"
  ]
}`
};
