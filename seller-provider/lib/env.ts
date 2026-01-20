import { z } from "zod";

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string().trim().min(1),
  NEXT_PUBLIC_CONVEX_SITE_URL: z.string().trim().min(1),
  NEXT_PUBLIC_BETTER_AUTH_BASE_URL: z.string().trim().min(1).optional(),
});

export type PublicEnv = z.infer<typeof PublicEnvSchema>;

export function getPublicEnv(): PublicEnv {
  const requiredKeys = [
    "NEXT_PUBLIC_CONVEX_URL",
    "NEXT_PUBLIC_CONVEX_SITE_URL",
  ] as const;

  const parsed = PublicEnvSchema.safeParse({
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    NEXT_PUBLIC_BETTER_AUTH_BASE_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL,
  });
  if (!parsed.success) {
    const missing = requiredKeys.filter((key) => {
      const value = process.env[key];
      return !value || value.trim().length === 0;
    });
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
    throw new Error("Invalid environment variables for seller-provider.");
  }
  return parsed.data;
}
