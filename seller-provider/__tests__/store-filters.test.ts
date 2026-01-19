import { describe, it, expect } from "vitest";

type Product = {
  name: string;
  nameEn?: string;
  sku?: string;
  description?: string;
};

function matchesQuery(p: Product, query: string) {
  const q = query.toLowerCase();
  return (
    p.name.toLowerCase().includes(q) ||
    (p.nameEn ? p.nameEn.toLowerCase().includes(q) : false) ||
    (p.sku ? p.sku.toLowerCase().includes(q) : false) ||
    (p.description ? p.description.toLowerCase().includes(q) : false)
  );
}

describe("store filter helpers", () => {
  it("does not throw when optional fields are undefined", () => {
    expect(matchesQuery({ name: "كرسي" }, "كر")).toBe(true);
    expect(matchesQuery({ name: "كرسي" }, "en")).toBe(false);
  });
});

