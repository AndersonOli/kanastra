<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Validation\ValidationException;
use Exception;
use App\CSV\ICSVHandler;
use App\CSV\CSVHandler;
use App\DTO\DebtDTO;
use Illuminate\Support\Facades\Log;

class ProcessDebtCSVImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    // 60 seconds * 10 = 600 seconds = 10 minutes
    public $timeout = 60 * 10;
    public $backoff = [1, 5, 15, 45, 135];

    private ICSVHandler $csvHandler;

    /**
     * Create a new job instance.
     */
    public function __construct(private readonly string $filePath)
    {
        $this->csvHandler = new CSVHandler($filePath);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            foreach ($this->csvHandler->getRecords() as $record) {
                try {
                    $debtDTO = new DebtDTO($record);

                    dispatch(new ProcessDebtImport($debtDTO))->onQueue('save');
                } catch (ValidationException $e) {
                    Log::emergency($e->getMessage());
                }
            }
        } catch (Exception $e) {
            Log::emergency($e->getMessage());
        } finally {
            $this->csvHandler->deleteFile();
        }
    }
}
