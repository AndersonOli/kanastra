<?php

namespace Tests\Unit\Jobs;

use App\DTO\DebtDTO;
use App\Jobs\ProcessDebtImport;
use App\Mail\DebtTicket;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ProcessDebtImportTests extends TestCase
{
    public function test_processes_debt_import_saves_data_on_db()
    {
        $debtDTO = new DebtDTO([
            'name' => 'John Doe',
            'governmentId' => '123456789',
            'email' => 'john@example.com',
            'debtAmount' => 1000,
            'debtDueDate' => now()->addDays(30),
            'debtId' => '1adb6ccf-ff16-467f-bea7-5f05d494280f',
        ]);

        $job = new ProcessDebtImport($debtDTO);
        $job->handle();

        $this->assertDatabaseHas('debts', [
            'name' => $debtDTO->name,
            'governmentId' => $debtDTO->governmentId,
            'email' => $debtDTO->email,
            'debtAmount' => $debtDTO->debtAmount,
            'debtDueDate' => $debtDTO->debtDueDate,
            'debtId' => $debtDTO->debtId,
        ]);
    }

    public function test_processes_debt_import_saves_data_and_send_email()
    {
        Mail::fake();

        $debtDTO = new DebtDTO([
            'name' => 'John Doe',
            'governmentId' => '123456789',
            'email' => 'john@example.com',
            'debtAmount' => 1000,
            'debtDueDate' => now()->addDays(30),
            'debtId' => '1adb6ccf-ff16-467f-bea7-5f05d494280f',
        ]);

        $job = new ProcessDebtImport($debtDTO);
        $job->handle();

        $this->assertDatabaseHas('debts', [
            'name' => $debtDTO->name,
            'governmentId' => $debtDTO->governmentId,
            'email' => $debtDTO->email,
            'debtAmount' => $debtDTO->debtAmount,
            'debtDueDate' => $debtDTO->debtDueDate,
            'debtId' => $debtDTO->debtId,
        ]);

        Mail::assertSent(DebtTicket::class);
    }
}
