import axios from "axios";
import {
  GetPaginatedDebts,
  IDebtImportService,
} from "@/services/debt/IDebtImportService";
import { DebtDTO } from "../DTOs/DebtDTO";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export class DebtService implements IDebtImportService {
  async getDebts(skip = 0, take = 10): Promise<GetPaginatedDebts> {
    const response = await axios.get<GetPaginatedDebts>(
      `${API_BASE_URL}/debt`,
      {
        params: { skip, take },
      }
    );
    return response.data;
  }

  async getDebt(id: string): Promise<DebtDTO> {
    const response = await axios.get<DebtDTO>(`${API_BASE_URL}/debt/${id}`);

    return response.data;
  }

  async createDebts(file: File): Promise<{ message: string }> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<{ message: string }>(
      `${API_BASE_URL}/debt`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async updateDebt(
    id: string,
    debt: Partial<DebtDTO>
  ): Promise<{ message: string }> {
    const response = await axios.put<{ message: string }>(
      `${API_BASE_URL}/debt/${id}`,
      debt
    );

    return response.data;
  }

  async deleteDebt(id: string): Promise<{ message: string }> {
    const response = await axios.delete<{ message: string }>(
      `${API_BASE_URL}/debt/${id}`
    );

    return response.data;
  }
}
