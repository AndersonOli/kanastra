<?php

namespace Database\Factories;

use App\Models\Debt;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Debt>
 */
class DebtFactory extends Factory
{
    protected $model = Debt::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'governmentId' => $this->faker->uuid,
            'email' => $this->faker->unique()->safeEmail,
            'debtAmount' => $this->faker->randomFloat(2, 100, 10000),
            'debtDueDate' => $this->faker->dateTimeThisDecade()->format('Y-m-d'),
            'debtId' => $this->faker->uuid,
        ];
    }
}
