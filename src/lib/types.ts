export type DiscoverResult = {
  problem: string;
  audience: string;
  goals: string[];
  constraints: string[];
  openQuestions: string[];
  refinedIdea: string;
};

export type PositionResult = {
  category: string;
  differentiator: string;
  valueProp: string;
  competitiveAngle: string;
  targetSegment: string;
};

export type ShapeResult = {
  traits: { trait: string; rationale: string }[];
  avoidTraits: string[];
  names: { name: string; rationale: string; style: string }[];
  taglines: string[];
  voice: { tone: string; do: string[]; dont: string[] };
};

export type VisualResult = {
  typography: { primary: string; secondary: string; reason: string };
  colors: { hex: string; name: string; usage: string }[];
  mood: string;
  symbols: string[];
  imagery: string;
  avoidVisuals: string[];
};

export type ChallengeResult = {
  issues: { type: string; description: string; severity: "low" | "medium" | "high" }[];
  genericityScore: number;
  consistencyScore: number;
  suggestions: string[];
  verdict: string;
};

export type DeliverResult = {
  brandSummary: string;
  landingHeadline: string;
  oneLinePitch: string;
  socialLaunchPosts: { instagram: string; linkedin: string; twitter: string };
  messagingPillars: string[];
  nextSteps: string[];
};

export type BrandContext = {
  discover?: DiscoverResult;
  position?: PositionResult;
  shape?: ShapeResult;
  visualize?: VisualResult;
  challenge?: ChallengeResult;
  deliver?: DeliverResult;
};

export type StageName = "discover" | "position" | "shape" | "visualize" | "challenge" | "deliver";
