import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { GetPaginatedDebts } from "@/services/debt/IDebtImportService";
import { DebtService } from "../DebtImportService";
import { DebtDTO } from "@/services/DTOs/DebtDTO";

const API_BASE_URL = "http://127.0.0.1:8000/api";
const mock = new MockAdapter(axios);
const debtService = new DebtService();

describe("DebtService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should fetch paginated debts", async () => {
    const mockResponse: GetPaginatedDebts = {
      data: [
        {
          id: 1,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-01-01T00:00:00Z",
          name: "John Doe",
          governmentId: "123456789",
          email: "john.doe@example.com",
          debtAmount: 100,
          debtDueDate: "2023-02-01",
          debtId: "d1",
        },
      ],
      total: 1,
    };
    mock
      .onGet(`${API_BASE_URL}/debt`, { params: { skip: 0, take: 10 } })
      .reply(200, mockResponse);

    const result = await debtService.getDebts();
    expect(result).toEqual(mockResponse);
  });

  it("should fetch a specific debt by id", async () => {
    const mockDebt: DebtDTO = {
      id: 1,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      name: "John Doe",
      governmentId: "123456789",
      email: "john.doe@example.com",
      debtAmount: 100,
      debtDueDate: "2023-02-01",
      debtId: "d1",
    };
    mock.onGet(`${API_BASE_URL}/debt/1`).reply(200, mockDebt);

    const result = await debtService.getDebt("1");
    expect(result).toEqual(mockDebt);
  });

  it("should create debts from a file", async () => {
    const mockMessage = { message: "Debt created successfully" };
    const file = new File([""], "test.csv");
    mock.onPost(`${API_BASE_URL}/debt`).reply(200, mockMessage);

    const result = await debtService.createDebts(file);
    expect(result).toEqual(mockMessage);
  });

  it("should update a specific debt by id", async () => {
    const mockMessage = { message: "Debt updated successfully" };
    const updatedDebt: Partial<DebtDTO> = { debtAmount: 150 };
    mock.onPut(`${API_BASE_URL}/debt/1`).reply(200, mockMessage);

    const result = await debtService.updateDebt("1", updatedDebt);
    expect(result).toEqual(mockMessage);
  });

  it("should delete a specific debt by id", async () => {
    const mockMessage = { message: "Debt deleted successfully" };
    mock.onDelete(`${API_BASE_URL}/debt/1`).reply(200, mockMessage);

    const result = await debtService.deleteDebt("1");
    expect(result).toEqual(mockMessage);
  });
});
