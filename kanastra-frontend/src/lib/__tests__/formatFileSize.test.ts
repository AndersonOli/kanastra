import { formatFileSize } from "../utils";

describe("formatFileSize", () => {
  it('should return "0 Bytes" for 0 bytes', () => {
    expect(formatFileSize(0)).toBe("0 Bytes");
  });

  it("should correctly format bytes to KB", () => {
    expect(formatFileSize(1024)).toBe("1 KB");
  });

  it("should correctly format bytes to MB", () => {
    expect(formatFileSize(1024 * 1024)).toBe("1 MB");
  });

  it("should correctly format bytes to GB", () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
  });

  it("should correctly format bytes to TB", () => {
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
  });

  it("should correctly format bytes with decimal points", () => {
    expect(formatFileSize(1500)).toBe("1.46 KB");
    expect(formatFileSize(1048576 + 500000)).toBe("1.48 MB");
  });
});
