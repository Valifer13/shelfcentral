<?php

namespace Database\Factories;

use App\Models\Borrow;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fine>
 */
class FineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'borrow_id' => Borrow::factory(),
            'amount' => $this->faker->randomFloat(2, 1, 50),
            'reason' => 'Overdue book return',
            'status' => 'UNPAID',
        ];
    }
}
