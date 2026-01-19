import { describe, it, expect } from "vitest";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  businessName: z.string().min(2).max(100).optional(),
  phone: z.string().min(8).max(20).optional(),
  language: z.string().optional(),
});

describe("Account Update Form Schema", () => {
  it("accepts valid inputs", () => {
    const data = {
      name: "Ahmed",
      businessName: "Antig",
      phone: "0555555555",
      language: "ar",
    };
    const parsed = FormSchema.parse(data);
    expect(parsed).toEqual(data);
  });

  it("rejects short name", () => {
    expect(() => FormSchema.parse({ name: "A" })).toThrow();
  });
});
