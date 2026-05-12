<?php

namespace Database\Factories;

use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AuditLog>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'library_id' => Library::factory(),
            'user_id' => User::factory(),
            'action_type' => $this->faker->randomElement(['LOGIN', 'LOGOUT', 'CREATE_BOOK', 'UPDATE_BOOK', 'DELETE_BOOK', 'BORROW_BOOK', 'RETURN_BOOK']),
            'source_ip' => $this->faker->ipv4(),
            'resource_type' => $this->faker->randomElement(['BOOK', 'USER', 'BORROW', 'RESERVATION']),
            'resource_id' => (string) $this->faker->randomNumber(5),
            'status' => 'SUCCESS',
        ];
    }
}
