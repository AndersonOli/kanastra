<?php

use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/debts', DebtController::class .'@index')->name('debts.index');
Route::post('/api/import-debt-csv', DebtController::class .'@store')->name('debts.store');

