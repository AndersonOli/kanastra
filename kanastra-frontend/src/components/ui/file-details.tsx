import React from "react";
import { FileLoadedEvent } from "./file-uploader";
import { formatFileSize } from "@/lib/utils";

type FileDetailsProps = {
  file: FileLoadedEvent | null;
};

const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  return file != null ? (
    <div>
      <h2 className="text-xl font-bold mb-4">Detalhes do Arquivo</h2>
      <p className="mb-2">
        <span className="font-semibold">Nome:</span> {file.fileName}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Tipo:</span> {file.fileType}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Tamanho:</span>{" "}
        {formatFileSize(file.fileSize)}
      </p>
    </div>
  ) : null;
};

export default FileDetails;
