<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessDebtCSVImport;
use App\Models\Debt;
use App\Traits\DispatchesDebtTicketEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebtController extends Controller
{
    use DispatchesDebtTicketEmail;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $skip = $request->query('skip', 0);
        $take = $request->query('take', 10);

        $debts = Debt::all()->skip($skip)->take($take);
        $totalDebts = Debt::count();

        return response()->json([
            'data' => $debts,
            'total' => $totalDebts
        ]);
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

        try {
            dispatch(new ProcessDebtCSVImport($path))->onQueue('import');
        } catch (\Exception $e) {
            Log::error($e->getMessage());
        }

        return response()->json(['message' => 'The file has been sent for processing successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $debt = Debt::findOrFail($id);

        return response()->json($debt);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'governmentId' => 'required|string',
            'email' => 'required|email',
            'debtAmount' => 'required|numeric',
            'debtDueDate' => 'required|date',
            'debtId' => 'required|string',
        ]);

        $debt = Debt::findOrFail($id);
        $debt->update($request->only('name', 'governmentId', 'email', 'debtAmount', 'debtDueDate', 'debtId'));

        $this->dispatchDebtEmail(
            $validatedData['email'],
            $validatedData['name'],
            $validatedData['debtAmount'],
            $validatedData['debtDueDate']
        );

        return response()->json(['message' => 'Debt updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Debt::destroy($id);

        return response()->json(['message' => 'Debt deleted successfully']);
    }
}
