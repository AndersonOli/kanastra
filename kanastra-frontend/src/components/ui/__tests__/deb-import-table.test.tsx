import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Debt } from "@/models/debt";
import DebtImportTable from "../deb-import-table";

describe("DebtImportTable", () => {
  it("renders correctly with debts", () => {
    const debts: Array<Debt> = [
      {
        id: 1,
        createdAt: "2023-01-01",
        updatedAt: "2023-01-01",
        name: "John Doe",
        governmentId: "123.456.789-00",
        email: "john.doe@example.com",
        debtAmount: 100.5,
        debtDueDate: "2024-05-01",
        debtId: "D1",
      },
      {
        id: 2,
        createdAt: "2023-02-01",
        updatedAt: "2023-02-01",
        name: "Jane Smith",
        governmentId: "987.654.321-00",
        email: "jane.smith@example.com",
        debtAmount: 200.75,
        debtDueDate: "2024-06-01",
        debtId: "D2",
      },
    ];
    const total = debts.length;

    render(<DebtImportTable debts={debts} total={total} />);

    expect(screen.getByText("Boletos Importados")).toBeInTheDocument();

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Valor da Dívida")).toBeInTheDocument();
    expect(screen.getByText("Data de Vencimento")).toBeInTheDocument();
    expect(screen.getByText("ID da Dívida")).toBeInTheDocument();

    debts.forEach((debt) => {
      expect(screen.getByText(debt.name)).toBeInTheDocument();
      expect(screen.getByText(debt.governmentId)).toBeInTheDocument();
      expect(screen.getByText(debt.email)).toBeInTheDocument();
      expect(screen.getByText(debt.debtAmount.toFixed(2))).toBeInTheDocument();
      expect(screen.getByText(debt.debtDueDate)).toBeInTheDocument();
      expect(screen.getByText(debt.debtId)).toBeInTheDocument();
    });

    expect(screen.getByText(`Total: ${total} boletos`)).toBeInTheDocument();
  });

  it("renders null when no debts are provided", () => {
    const { container } = render(<DebtImportTable debts={[]} total={0} />);
    expect(container.firstChild).toBeNull();
  });
});
