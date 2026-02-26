// External dependencies
import { it, describe, expect } from "vitest";

// Internal dependencies
import { isValidHexColor } from "./colors";

describe("isValidHexColor", () => {
  it("should return true for valid 3-digit hex color", () => {
    const input = "#abc";
    const result = isValidHexColor(input);
    expect(result).toBe(true);
  });

  it("should return true for valid 6-digit hex color", () => {
    const input = "#a1b2c3";
    const result = isValidHexColor(input);
    expect(result).toBe(true);
  });

  it("should return false for invalid hex colors", () => {
    const input = "#12";
    const result = isValidHexColor(input);
    expect(result).toBe(false);
  });

  it("should return false for non-hex strings", () => {
    const input = "not-a-color";
    const result = isValidHexColor(input);
    expect(result).toBe(false);
  });

  it("should return false for hex colors without #", () => {
    const input = "a1b2c3";
    const result = isValidHexColor(input);
    expect(result).toBe(false);
  });
});
