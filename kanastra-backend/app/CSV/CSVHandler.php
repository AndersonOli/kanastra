<?php

namespace App\CSV;

use League\Csv\Reader;
use Iterator;

class CSVHandler implements ICSVHandler {
    /**
     * Recieves the path to the CSV file.
     */
    public function __construct(private string $filePath)
    {}

    /**
     * Retrieves an iterator of CSV records from the file.
     *
     * @return Iterator An iterator containing CSV records.
     */
    public function getRecords(): Iterator {
        $csv = Reader::createFromPath($this->filePath, 'r');

        $csv->setHeaderOffset(0);

        return $csv->getRecords();
    }

    /**
     * Deletes the CSV file.
     *
     * @return bool Returns true if the file was successfully deleted, false otherwise.
     */
    public function deleteFile(): bool {
        return unlink($this->filePath);
    }
}
