import { Debt } from "@/models/debt";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "./table";

type DebtImportTableProps = {
  total: number;
  debts?: Array<Debt>;
};

const DebtImportTable: React.FC<DebtImportTableProps> = ({ debts, total }) => {
  return debts && debts?.length > 0 ? (
    <Table className="table-auto">
      <TableCaption>Boletos Importados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Valor da Dívida</TableHead>
          <TableHead>Data de Vencimento</TableHead>
          <TableHead>ID da Dívida</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((debt) => (
          <TableRow key={debt.id}>
            <TableCell>{debt.name}</TableCell>
            <TableCell>{debt.governmentId}</TableCell>
            <TableCell>{debt.email}</TableCell>
            <TableCell>{debt.debtAmount.toFixed(2)}</TableCell>
            <TableCell>{debt.debtDueDate}</TableCell>
            <TableCell>{debt.debtId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total: {total} boletos</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ) : null;
};

export default DebtImportTable;
