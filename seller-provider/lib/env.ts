import { z } from "zod";

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_CONVEX_URL: z.string().min(1),
  NEXT_PUBLIC_CONVEX_SITE_URL: z.string().min(1),
  NEXT_PUBLIC_BETTER_AUTH_BASE_URL: z.string().optional(),
});

export type PublicEnv = z.infer<typeof PublicEnvSchema>;

export function getPublicEnv(): PublicEnv {
  const parsed = PublicEnvSchema.safeParse({
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    NEXT_PUBLIC_BETTER_AUTH_BASE_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL,
  });
  if (!parsed.success) {
    throw new Error("Missing required environment variables for seller-provider.");
  }
  return parsed.data;
}
