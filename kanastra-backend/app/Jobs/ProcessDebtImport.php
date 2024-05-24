<?php

namespace App\Jobs;

use App\Models\Debt;
use App\Traits\DispatchesDebtTicketEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Exception;
use App\DTO\DebtDTO;

class ProcessDebtImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, DispatchesDebtTicketEmail;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly DebtDTO $debtDTO)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $debt = new Debt([
                'name' => $this->debtDTO->name,
                'governmentId' => $this->debtDTO->governmentId,
                'email' => $this->debtDTO->email,
                'debtAmount' => $this->debtDTO->debtAmount,
                'debtDueDate' => $this->debtDTO->debtDueDate,
                'debtId' => $this->debtDTO->debtId,
            ]);

            $debtWasSaved = $debt->save();

            if ($debtWasSaved) {
                $this->dispatchDebtEmail(
                    $this->debtDTO->email,
                    $this->debtDTO->name,
                    $this->debtDTO->debtAmount,
                    $this->debtDTO->debtDueDate
                );
            }
        } catch (Exception $e) {
            Log::error($e->getMessage());
        }
    }
}
