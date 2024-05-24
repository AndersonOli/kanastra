<?php

namespace Tests\Unit\Jobs;

use App\CSV\CSVHandler;
use Tests\TestCase;
use App\Jobs\ProcessDebtCSVImport;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Log;
use Mockery;

class ProcessDebtCSVImportTests extends TestCase
{
    private string $filePath;

    protected function setUp(): void
    {
        parent::setUp();
        $this->filePath = __DIR__ . '/test.csv';
        file_put_contents($this->filePath, "header1,header2\nvalue1,value2");
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();

        if (file_exists($this->filePath)) {
            unlink($this->filePath);
        }
    }

    public function test_enqueue_csv_file()
    {
        Queue::fake();
        Log::shouldReceive('emergency')->andReturnNull();

        $queue = 'default';

        ProcessDebtCSVImport::dispatch($this->filePath)->onQueue($queue);

        Queue::assertPushedOn($queue, ProcessDebtCSVImport::class);
    }

    public function test_after_process_should_delete_the_csv_file()
    {
        $csvHandlerMock = Mockery::mock(CSVHandler::class);
        $csvHandlerMock->shouldReceive('getRecords')->andReturn([]);
        $csvHandlerMock->shouldReceive('deleteFile')->once()->andReturn(true);

        $job = new ProcessDebtCSVImport($this->filePath);
        $job->handle();

        $this->assertTrue($csvHandlerMock->deleteFile());
    }
}
