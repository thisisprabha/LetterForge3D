import { z } from "zod";

// Material configuration for glass rendering
export const materialConfigSchema = z.object({
  baseColor: z.string().default("#ffffff"),
  noColor: z.boolean().default(false), // When true, glass has no color tint (completely clear)
  ior: z.number().min(1.4).max(1.6).default(1.5),
  roughness: z.number().min(0).max(0.3).default(0.02),
  thickness: z.number().min(0.1).max(2.0).default(0.5),
  dispersion: z.boolean().default(true),
  transmission: z.number().min(0).max(1).default(1.0),
  edgeSmooth: z.boolean().default(true), // Enable/disable edge smoothing/beveling
});

export type MaterialConfig = z.infer<typeof materialConfigSchema>;

// Export configuration
export const exportConfigSchema = z.object({
  format: z.enum(["png", "usdz", "png-animated"]).default("png"),
  resolution: z.number().default(1024),
  transparent: z.boolean().default(true),
  // Animation settings
  animationType: z.enum(["rotation", "tilt", "both"]).default("rotation"),
  rotationStart: z.number().default(0),
  rotationEnd: z.number().default(-90),
  tiltStart: z.number().default(0),
  tiltEnd: z.number().default(45),
  frameCount: z.number().default(30),
});

export type ExportConfig = z.infer<typeof exportConfigSchema>;

// Character set - Only numbers for now (A-Z hidden)
export const CHARACTERS = "0123456789".split("");

// Rotation state
export const rotationStateSchema = z.object({
  x: z.number().default(0),
  y: z.number().default(0),
});

export type RotationState = z.infer<typeof rotationStateSchema>;

// View mode
export type ViewMode = "single" | "grid";
