<?php

namespace App\CSV;

use Iterator;

interface ICSVHandler {
    public function getRecords(): Iterator;

    public function deleteFile(): bool;
}
