import { describe, it, expect } from "vitest";
import { handleConvexError } from "../lib/utils/errors";

describe("handleConvexError", () => {
  it("maps ConvexError data codes to Arabic messages", () => {
    const msg = handleConvexError({ data: { code: "FORBIDDEN", message: "Unauthorized" } } as any);
    expect(msg).toContain("غير مصرح");
  });

  it("falls back to message when code is unknown", () => {
    const msg = handleConvexError({ data: { code: "SOMETHING", message: "X" } } as any);
    expect(msg).toBe("X");
  });
});
