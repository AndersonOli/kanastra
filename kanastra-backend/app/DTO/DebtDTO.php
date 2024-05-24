<?php

namespace App\DTO;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class DebtDTO
{
    public string $name;
    public string $governmentId;
    public string $email;
    public float $debtAmount;
    public string $debtDueDate;
    public string $debtId;

    /**
     * @throws ValidationException
     */
    public function __construct(array $data)
    {
        $this->validate($data);

        $this->name = $data['name'];
        $this->governmentId = $data['governmentId'];
        $this->email = $data['email'];
        $this->debtAmount = $data['debtAmount'];
        $this->debtDueDate = $data['debtDueDate'];
        $this->debtId = $data['debtId'];
    }

    /**
     * @throws ValidationException
     */
    protected function validate(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'governmentId' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'debtAmount' => 'required|numeric',
            'debtDueDate' => 'required|date',
            'debtId' => 'required|uuid',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}
