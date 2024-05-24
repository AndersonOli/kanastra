<?php

namespace Tests\Unit\Models;

use PHPUnit\Framework\TestCase;
use App\Models\Debt;

class DebtTests extends TestCase
{
    public function test_debt_model_can_be_created()
    {
        $debt = new Debt([
            'name' => 'John Doe',
            'governmentId' => '123456789',
            'email' => 'john@example.com',
            'debtAmount' => 1000,
            'debtDueDate' => '2024-06-01',
            'debtId' => 'ABC123'
        ]);

        $this->assertInstanceOf(Debt::class, $debt);
        $this->assertEquals('John Doe', $debt->name);
        $this->assertEquals('123456789', $debt->governmentId);
        $this->assertEquals('john@example.com', $debt->email);
        $this->assertEquals(1000, $debt->debtAmount);
        $this->assertEquals('2024-06-01', $debt->debtDueDate);
        $this->assertEquals('ABC123', $debt->debtId);
    }

    public function test_fillable_properties_are_correct()
    {
        $debt = new Debt();

        $fillable = [
            'name',
            'governmentId',
            'email',
            'debtAmount',
            'debtDueDate',
            'debtId',
        ];

        $this->assertEquals($fillable, $debt->getFillable());
    }
}
