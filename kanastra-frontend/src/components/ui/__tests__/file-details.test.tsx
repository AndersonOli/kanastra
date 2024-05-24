import { render, screen } from "@testing-library/react";
import { formatFileSize } from "@/lib/utils";
import FileDetails from "../file-details";
import "@testing-library/jest-dom";
import { FileLoadedEvent } from "../file-uploader";

jest.mock("@/lib/utils", () => ({
  formatFileSize: jest.fn(),
}));

describe("FileDetails component", () => {
  it("should render nothing when file is null", () => {
    render(<FileDetails file={null} />);
    expect(screen.queryByText("Detalhes do Arquivo")).not.toBeInTheDocument();
  });

  it("should render file details when file is provided", () => {
    const fileMock: File = new File(["content"], "test.txt", {
      type: "text/plain",
    });
    const file: FileLoadedEvent = {
      fileName: "test.txt",
      fileType: "text/plain",
      fileSize: 1024,
      file: fileMock,
    };

    (formatFileSize as jest.Mock).mockReturnValue("1 KB");

    render(<FileDetails file={file} />);

    expect(screen.getByText("Detalhes do Arquivo")).toBeInTheDocument();
    expect(screen.getByText("Nome:")).toBeInTheDocument();
    expect(screen.getByText("test.txt")).toBeInTheDocument();
    expect(screen.getByText("Tipo:")).toBeInTheDocument();
    expect(screen.getByText("text/plain")).toBeInTheDocument();
    expect(screen.getByText("Tamanho:")).toBeInTheDocument();
    expect(screen.getByText("1 KB")).toBeInTheDocument();
  });
});
