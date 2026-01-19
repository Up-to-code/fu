import { describe, it, expect } from "vitest";
import { z } from "zod";

const OrgSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().max(80).optional().or(z.literal("")),
  commercialRegistration: z.string().max(50).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
});

describe("Organizations form schema", () => {
  it("accepts valid inputs", () => {
    const data = {
      name: "My Organization",
      slug: "my-organization",
      commercialRegistration: "1234567890",
      website: "https://example.com",
      description: "Test",
    };
    expect(OrgSchema.parse(data)).toEqual(data);
  });

  it("rejects too-short name", () => {
    expect(() => OrgSchema.parse({ name: "A" })).toThrow();
  });
});

