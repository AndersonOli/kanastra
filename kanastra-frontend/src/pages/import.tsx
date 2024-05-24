import { FileLoadedEvent, FileUploader } from "@/components";
import DebtImportTable from "@/components/ui/deb-import-table";
import FileDetails from "@/components/ui/file-details";
import LoadingSkeleton from "@/components/ui/skeleton";
import Pagination from "@/components/ui/table-pagination";
import Wrapper from "@/components/ui/wrapper";
import { useEvent } from "@/contexts/EventContext";
import { Debt } from "@/models/debt";
import { DebtService } from "@/services/debt/DebtImportService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DEFAULT_SKIP = 10;
const SUCCES_MESSAGE_WHEN_UPLOAD_FILE =
  "The file has been sent for processing successfully!";

type DebtResponse = {
  total: number;
  page: number;
  debts: Array<Debt>;
};

const ImportPage = () => {
  const [loading, setLoading] = useState(true);
  const [debts, setDebts] = useState<DebtResponse>({
    total: 0,
    page: 1,
    debts: [],
  });
  const { addEventListener } = useEvent();

  const [fileLoadedEvent, setEventData] = useState<FileLoadedEvent | null>(
    null
  );

  useEffect(() => {
    const handleEvent = (data: FileLoadedEvent) => {
      setEventData(data);
    };

    const removeListener = addEventListener<FileLoadedEvent>(
      "FileLoadedEvent",
      handleEvent
    );

    return () => removeListener();
  }, [addEventListener]);

  useEffect(() => {
    const debtService = new DebtService();

    debtService
      .getDebts()
      .then((response) => {
        console.log({ response }, "response 1");
        setDebts({
          total: response.total,
          page: 1,
          debts: response.data.flatMap((dt) => {
            return {
              id: Number(dt.id),
              governmentId: String(dt.governmentId),
              debtId: String(dt.debtId),
              name: String(dt.name),
              email: String(dt.email),
              debtAmount: Number(dt.debtAmount),
              debtDueDate: String(dt.debtDueDate),
              createdAt: String(dt.created_at),
              updatedAt: String(dt.updated_at),
            };
          }),
        });
      })
      .catch(() => {
        toast.error("Ops, parece que houve um erro!");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSendRequestToImportCSV = () => {
    if (fileLoadedEvent == null) {
      toast.error(
        "Erro! Parece que o arquivo ainda não foi carregado, tente novamente!"
      );
      return;
    }

    const debtService = new DebtService();

    debtService
      .createDebts(fileLoadedEvent.file)
      .then((response) => {
        if (response.message == SUCCES_MESSAGE_WHEN_UPLOAD_FILE) {
          toast.success(
            "Sucesso! Seu arquivo será processado e cada devedor recebrá um email com a cobrança!"
          );
        } else {
          toast.error("Parece que algo inesperado aconteceu, tenta novamente?");
        }
      })
      .catch(() => {
        toast.error("Ops, houve um erro ao tentar processar seu arquivo");
      })
      .finally(() => setLoading(false));
  };

  const handleOnPageChange = async (newPage: number) => {
    try {
      setLoading(true);

      const newSkip = newPage * DEFAULT_SKIP;
      const debtService = new DebtService();

      const response = await debtService.getDebts(newSkip);

      let items = response.data;

      if (!Array.isArray(items)) {
        items = Object.values(response.data);
      }

      const transformedDebts = items.map((dt) => ({
        id: Number(dt.id),
        governmentId: String(dt.governmentId),
        debtId: String(dt.debtId),
        name: String(dt.name),
        email: String(dt.email),
        debtAmount: Number(dt.debtAmount),
        debtDueDate: String(dt.debtDueDate),
        createdAt: String(dt.created_at),
        updatedAt: String(dt.updated_at),
      }));

      setDebts({
        page: newPage,
        total: response.total,
        debts: transformedDebts,
      });
    } catch (error) {
      console.error(error);
      toast.error("Ops, parece que houve um erro!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div>
        <FileUploader />

        {fileLoadedEvent && (
          <div className="file-details p-4 border rounded shadow-md my-6 flex items-center justify-between px-8">
            <FileDetails file={fileLoadedEvent} />

            <button
              onClick={handleSendRequestToImportCSV}
              type="button"
              className="h-[40px] w-[180px] flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Enviar arquivo
            </button>
          </div>
        )}

        <div className="mt-8 h-[700px]">
          {!loading ? (
            <>
              <DebtImportTable debts={debts.debts} total={debts.total} />

              <Pagination
                page={debts.page}
                pageCount={debts.total / 10}
                onPageChange={handleOnPageChange}
              />
            </>
          ) : null}

          <LoadingSkeleton rows={20} show={loading} />
        </div>
      </div>
    </Wrapper>
  );
};

export default ImportPage;
