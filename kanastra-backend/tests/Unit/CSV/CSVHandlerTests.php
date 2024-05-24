<?php

namespace Tests\Unit\CSV;

use App\CSV\CSVHandler;
use PHPUnit\Framework\TestCase;

class CSVHandlerTests extends TestCase
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
        parent::tearDown();
        if (file_exists($this->filePath)) {
            unlink($this->filePath);
        }
    }

    public function test_get_records_returns_correct_data_with_offset_one()
    {
        $csv_handler = new CSVHandler($this->filePath);
        $records = $csv_handler->getRecords();

        $expected = [
            1 => ['header1' => 'value1', 'header2' => 'value2']
        ];

        $this->assertEquals($expected, iterator_to_array($records));
    }

    public function test_delete_file_removes_csv_file()
    {
        $csv_handler = new CSVHandler($this->filePath);

        $this->assertFileExists($this->filePath);
        $this->assertTrue($csv_handler->deleteFile());
        $this->assertFileDoesNotExist($this->filePath);
    }

    public function test_delete_file_returns_false_for_non_existent_file()
    {
        $non_existent_file_path = __DIR__ . '/non_existent.csv';
        $csv_handler = new CSVHandler($non_existent_file_path);

        $this->assertFalse($csv_handler->deleteFile());
    }

    public function test_get_records_from_empty_csv()
    {
        file_put_contents($this->filePath, "header1,header2\n");
        $csv_handler = new CSVHandler($this->filePath);
        $records = $csv_handler->getRecords();

        $expected = [];

        $this->assertEquals($expected, iterator_to_array($records));
    }

    public function test_get_records_from_empty_value_column_csv_should_return_null()
    {
        file_put_contents($this->filePath, "header1,header2\nvalue1");
        $csv_handler = new CSVHandler($this->filePath);

        $records = $csv_handler->getRecords();

        $expected = [
            1 => ['header1' => 'value1', 'header2' => null]
        ];

        $this->assertEquals($expected, iterator_to_array($records));
    }

    public function test_get_records_from_large_csv()
    {
        $amountOfData = 10000;
        $largeData = "header1,header2\n";
        for ($i = 1; $i <= $amountOfData; $i++) {
            $largeData .= "value1_$i,value2_$i\n";
        }
        file_put_contents($this->filePath, $largeData);

        $csv_handler = new CSVHandler($this->filePath);
        $records = $csv_handler->getRecords();

        $expected = [];
        for ($i = 1; $i <= $amountOfData; $i++) {
            $expected[$i] = ['header1' => "value1_$i", 'header2' => "value2_$i"];
        }

        $this->assertEquals($expected, iterator_to_array($records));
    }
}
