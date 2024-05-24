import { useEvent } from "@/contexts/EventContext";
import { IoCloudUpload } from "react-icons/io5";
import { toast } from "react-toastify";

const MAX_UPLOAD_SIZE = 200 * 1024 * 1024; // 200MB

export type FileLoadedEvent = {
  file: File;
  fileName: string;
  fileType: string;
  fileSize: number;
};

const FileUploader = () => {
  const { emitEvent } = useEvent();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files == null) {
      toast.error("Ocorreu um erro inesperado, tenta novamente?");
      return;
    }

    const file = files[0];

    if (file) {
      if (file.type !== "text/csv") {
        toast.error("Ops, você está tentando enviar um arquivo que não é CSV!");
        return;
      }
      if (file.size > MAX_UPLOAD_SIZE) {
        toast.error("Ops, você ultrapassou o limite de 200MB's!");
        return;
      }

      emitEvent<FileLoadedEvent>("FileLoadedEvent", {
        file,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <IoCloudUpload size={"45"} />

            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Clique para fazer o upload</span>
            </p>
            <p className="text-xs text-gray-500">CSV (MAX. 200 megabytes)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            required
            accept=".csv"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export { FileUploader };
