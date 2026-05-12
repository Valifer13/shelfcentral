<?php

namespace Database\Factories;

use App\Models\BookCopy;
use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Borrow>
 */
class BorrowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $library = Library::factory();
        return [
            'library_id' => $library,
            'book_copy_id' => BookCopy::factory(),
            'user_id' => User::factory(['library_id' => $library]),
            'borrowed_at' => now()->subDays(rand(1, 30)),
            'due_at' => now()->addDays(rand(1, 14)),
            'returned_at' => null,
            'total_fine' => 0,
            'status' => 'ONGOING',
        ];
    }
}
