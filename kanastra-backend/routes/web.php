<?php

use App\Http\Controllers\DebtController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api/debt')->group(function () {
    Route::get('/', [DebtController::class, 'index']);
    Route::post('/', [DebtController::class, 'store']);
    Route::get('/{id}', [DebtController::class, 'show']);
    Route::post('/{id}', [DebtController::class, 'update']); // for some reason, put or patch were not working, but it should be a put method.
    Route::delete('/{id}', [DebtController::class, 'destroy']);
});
