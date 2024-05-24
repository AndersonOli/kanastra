import { DebtDTO } from "@/services/DTOs/DebtDTO";

export type GetPaginatedDebts = {
  data: Array<DebtDTO>;
  total: number;
}

export interface IDebtImportService {
  getDebts(skip?: number, take?: number): Promise<GetPaginatedDebts>;

  getDebt(id: string): Promise<DebtDTO>;

  createDebts(file: File): Promise<{ message: string }>;

  updateDebt(id: string, debt: Partial<DebtDTO>): Promise<{ message: string }>;

  deleteDebt(id: string): Promise<{ message: string }>;
}
