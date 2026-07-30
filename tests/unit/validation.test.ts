import { describe, expect, it } from "vitest";
import {
  isSafeExternalUrl,
  isValidContactFormUrl,
  isValidPublicEmail
} from "@/lib/validation";

describe("contact validation", () => {
  it("Google Forms系HTTPSだけを許可する", () => {
    expect(isValidContactFormUrl("https://forms.gle/abc")).toBe(true);
    expect(isValidContactFormUrl("https://example.com/form")).toBe(false);
  });

  it("ダミーメールを拒否する", () => {
    expect(isValidPublicEmail("editor@example.com")).toBe(false);
    expect(isValidPublicEmail("contact@tokyo.test")).toBe(true);
  });

  it("外部URLはHTTPSだけを安全とする", () => {
    expect(isSafeExternalUrl("https://www.jreast.co.jp/")).toBe(true);
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
  });
});
