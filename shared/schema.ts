import { z } from "zod";

// Material configuration for glass rendering
export const materialConfigSchema = z.object({
  baseColor: z.string().default("#ffffff"),
  ior: z.number().min(1.4).max(1.6).default(1.5),
  roughness: z.number().min(0).max(0.3).default(0.02),
  thickness: z.number().min(0.1).max(2.0).default(0.5),
  dispersion: z.boolean().default(true),
  transmission: z.number().min(0).max(1).default(1.0),
});

export type MaterialConfig = z.infer<typeof materialConfigSchema>;

// Export configuration
export const exportConfigSchema = z.object({
  format: z.enum(["png", "usdz"]).default("png"),
  resolution: z.number().default(1024),
  transparent: z.boolean().default(true),
});

export type ExportConfig = z.infer<typeof exportConfigSchema>;

// Character set
export const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

// Rotation state
export const rotationStateSchema = z.object({
  x: z.number().default(0),
  y: z.number().default(0),
});

export type RotationState = z.infer<typeof rotationStateSchema>;

// View mode
export type ViewMode = "single" | "grid";
