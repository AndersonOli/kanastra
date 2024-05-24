import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";
import { useEvent } from "@/contexts/EventContext";
import { FileUploader } from "../file-uploader";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/contexts/EventContext", () => ({
  useEvent: jest.fn(),
}));

describe("FileUploader component", () => {
  const mockEmitEvent = jest.fn();

  beforeEach(() => {
    (useEvent as jest.Mock).mockReturnValue({ emitEvent: mockEmitEvent });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<FileUploader />);
    expect(screen.getByText("Clique para fazer o upload")).toBeInTheDocument();
    expect(screen.getByText("CSV (MAX. 200 megabytes)")).toBeInTheDocument();
  });

  test("shows error if no files are selected", () => {
    render(<FileUploader />);
    const input = screen.getByLabelText(/Clique para fazer o upload/i);
    fireEvent.change(input, { target: { files: null } });
    expect(toast.error).toHaveBeenCalledWith(
      "Ocorreu um erro inesperado, tenta novamente?"
    );
  });

  test("shows error if file is not a CSV", () => {
    const file = new File(["content"], "example.txt", { type: "text/plain" });
    render(<FileUploader />);
    const input = screen.getByLabelText(/Clique para fazer o upload/i);
    fireEvent.change(input, { target: { files: [file] } });
    expect(toast.error).toHaveBeenCalledWith(
      "Ops, você está tentando enviar um arquivo que não é CSV!"
    );
  });

  test("emits event if file is valid", () => {
    const file = new File(["content"], "example.csv", { type: "text/csv" });
    render(<FileUploader />);
    const input = screen.getByLabelText(/Clique para fazer o upload/i);
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockEmitEvent).toHaveBeenCalledWith("FileLoadedEvent", {
      file,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  });
});
