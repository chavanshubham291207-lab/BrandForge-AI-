import { z } from "zod";

// Helper to sanitize string arrays (handles if LLM returned array of objects instead of strings)
const toStringArray = (val: unknown): string[] => {
  if (!Array.isArray(val)) return [];
  return val.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object") {
      const obj = item as Record<string, any>;
      return (
        obj.trait ||
        obj.name ||
        obj.value ||
        obj.description ||
        obj.text ||
        JSON.stringify(item)
      );
    }
    return String(item);
  });
};

export const DiscoverSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};
  return {
    problem: val.problem || val.realProblem || "",
    audience: typeof val.audience === "object" ? JSON.stringify(val.audience) : (val.audience || ""),
    goals: toStringArray(val.goals || val.userGoals),
    constraints: toStringArray(val.constraints),
    openQuestions: toStringArray(val.openQuestions || val.questions),
    refinedIdea: val.refinedIdea || val.oneSentenceIdea || val.summary || "",
  };
}, z.object({
  problem: z.string(),
  audience: z.string(),
  goals: z.array(z.string()),
  constraints: z.array(z.string()),
  openQuestions: z.array(z.string()),
  refinedIdea: z.string(),
}));

export const PositionSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};
  return {
    category: val.category || val.space || "",
    differentiator: val.differentiator || val.uniqueAngle || "",
    valueProp: val.valueProp || val.valueProposition || "",
    competitiveAngle: val.competitiveAngle || val.competitors || "",
    targetSegment: val.targetSegment || val.targetAudience || "",
  };
}, z.object({
  category: z.string(),
  differentiator: z.string(),
  valueProp: z.string(),
  competitiveAngle: z.string(),
  targetSegment: z.string(),
}));

export const ShapeSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};

  const rawTraits = val.traits || val.personalityTraits || val.brandTraits || [];
  const traits = Array.isArray(rawTraits)
    ? rawTraits.map((t: any) => {
        if (typeof t === "string") return { trait: t, rationale: "" };
        return {
          trait: t.trait || t.name || "",
          rationale: t.rationale || t.reason || t.description || "",
        };
      })
    : [];

  const rawNames = val.names || val.namingDirections || val.brandNames || [];
  const names = Array.isArray(rawNames)
    ? rawNames.map((n: any) => {
        if (typeof n === "string") return { name: n, rationale: "", style: "Modern" };
        return {
          name: n.name || "",
          rationale: n.rationale || n.reason || "",
          style: n.style || n.type || "Modern",
        };
      })
    : [];

  const voiceObj = val.voice || {};
  const voice = {
    tone: voiceObj.tone || val.tone || "Empathetic, clear, and confident",
    do: toStringArray(voiceObj.do || voiceObj.dos || voiceObj.dosAndDonts?.do || val.dos),
    dont: toStringArray(voiceObj.dont || voiceObj.donts || voiceObj.dosAndDonts?.dont || val.donts),
  };

  return {
    traits,
    avoidTraits: toStringArray(val.avoidTraits || val.traitsToAvoid),
    names,
    taglines: toStringArray(val.taglines || val.slogans),
    voice,
  };
}, z.object({
  traits: z.array(
    z.object({
      trait: z.string(),
      rationale: z.string(),
    })
  ),
  avoidTraits: z.array(z.string()),
  names: z.array(
    z.object({
      name: z.string(),
      rationale: z.string(),
      style: z.string(),
    })
  ),
  taglines: z.array(z.string()),
  voice: z.object({
    tone: z.string(),
    do: z.array(z.string()),
    dont: z.array(z.string()),
  }),
}));

export const VisualSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};

  const rawColors = val.colors || val.palette || val.colorPalette || [];
  const colors = Array.isArray(rawColors)
    ? rawColors.map((c: any) => {
        if (typeof c === "string") return { hex: c, name: c, usage: "Accent" };
        return {
          hex: c.hex || c.code || "#6366f1",
          name: c.name || "Color",
          usage: c.usage || c.role || "Primary",
        };
      })
    : [];

  const typo = val.typography || {};

  return {
    typography: {
      primary: typo.primary || typo.heading || "Inter",
      secondary: typo.secondary || typo.body || "Roboto",
      reason: typo.reason || typo.rationale || "Clean and modern legibility",
    },
    colors,
    mood: val.mood || val.overallMood || "Modern and innovative",
    symbols: toStringArray(val.symbols || val.motifs || val.symbolicMotifs),
    imagery: val.imagery || val.imageryStyle || "Minimalist with purposeful lighting",
    avoidVisuals: toStringArray(val.avoidVisuals || val.visualsToAvoid || val.clichesToAvoid),
  };
}, z.object({
  typography: z.object({
    primary: z.string(),
    secondary: z.string(),
    reason: z.string(),
  }),
  colors: z.array(
    z.object({
      hex: z.string(),
      name: z.string(),
      usage: z.string(),
    })
  ),
  mood: z.string(),
  symbols: z.array(z.string()),
  imagery: z.string(),
  avoidVisuals: z.array(z.string()),
}));

export const ChallengeSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};

  const rawIssues = val.issues || val.problems || [];
  const issues = Array.isArray(rawIssues)
    ? rawIssues.map((issue: any) => {
        const severityRaw = String(issue.severity || "medium").toLowerCase();
        const severity = ["low", "medium", "high"].includes(severityRaw)
          ? severityRaw
          : "medium";
        return {
          type: issue.type || "Observation",
          description: issue.description || issue.desc || String(issue),
          severity,
        };
      })
    : [];

  const genericityScore = typeof val.genericityScore === "number"
    ? val.genericityScore
    : parseInt(val.genericityScore) || 25;
  const consistencyScore = typeof val.consistencyScore === "number"
    ? val.consistencyScore
    : parseInt(val.consistencyScore) || 85;

  return {
    issues,
    genericityScore: Math.min(100, Math.max(0, genericityScore)),
    consistencyScore: Math.min(100, Math.max(0, consistencyScore)),
    suggestions: toStringArray(val.suggestions || val.recommendations),
    verdict: val.verdict || (genericityScore < 40 && consistencyScore > 70 ? "Ready to launch" : "Needs refinement"),
  };
}, z.object({
  issues: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  genericityScore: z.number().min(0).max(100),
  consistencyScore: z.number().min(0).max(100),
  suggestions: z.array(z.string()),
  verdict: z.string(),
}));

export const DeliverSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== "object") return {};

  const posts = val.socialLaunchPosts || val.socialPosts || {};

  return {
    brandSummary: val.brandSummary || val.summary || "",
    landingHeadline: val.landingHeadline || val.headline || "",
    oneLinePitch: val.oneLinePitch || val.pitch || "",
    socialLaunchPosts: {
      instagram: posts.instagram || posts.ig || "",
      linkedin: posts.linkedin || "",
      twitter: posts.twitter || posts.x || "",
    },
    messagingPillars: toStringArray(val.messagingPillars || val.pillars),
    nextSteps: toStringArray(val.nextSteps || val.steps),
  };
}, z.object({
  brandSummary: z.string(),
  landingHeadline: z.string(),
  oneLinePitch: z.string(),
  socialLaunchPosts: z.object({
    instagram: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
  }),
  messagingPillars: z.array(z.string()),
  nextSteps: z.array(z.string()),
}));
