import { isValidImageUrl } from "../utils";

describe("isValidImageUrl", () => {
  it("should return true for valid image URLs", () => {
    const validUrls = [
      "https://example.com/image.jpg",
      "https://example.com/image.jpeg",
      "https://example.com/image.png",
      "https://example.com/image.gif",
      "https://example.com/image.webp",
      "https://example.com/image.svg",
    ];

    validUrls.forEach((url) => {
      expect(isValidImageUrl(url)).toBe(true);
    });
  });

  it("should return false for invalid image URLs", () => {
    const invalidUrls = [
      "https://example.com/image.txt",
      "https://example.com/image",
      "https://example.com/",
      "invalid-url",
    ];

    invalidUrls.forEach((url) => {
      expect(isValidImageUrl(url)).toBe(false);
    });
  });

  it("should return false for malformed URLs", () => {
    const malformedUrls = ["://example.com/image.jpg", "example.com/image.jpg"];

    malformedUrls.forEach((url) => {
      expect(isValidImageUrl(url)).toBe(false);
    });
  });
});
