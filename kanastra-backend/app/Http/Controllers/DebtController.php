<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessDebtCSVImport;
use App\Models\Debt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $skip = $request->query('skip', 0);
        $take = $request->query('take', 10);

        $debts = Debt::all()->skip($skip)->take($take);

        return response()->json($debts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('file');
        $storedFile = $file->store('csv', 'public');
        $path = storage_path('app/public/' . $storedFile);

        dispatch(new ProcessDebtCSVImport($path))->onQueue('import');

        return response()->json(['message' => 'The file has been sent for processing successfully, you will receive an email with the result within a few minutes!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
