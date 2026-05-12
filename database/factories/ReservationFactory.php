<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $library = Library::factory();
        $book = Book::factory(['library_id' => $library]);
        return [
            'library_id' => $library,
            'user_id' => User::factory(['library_id' => $library]),
            'book_id' => $book,
            'book_copy_id' => BookCopy::factory(['book_id' => $book]),
            'status' => 'PENDING',
            'queue_priority' => 1,
            'notified_at' => null,
            'expires_at' => now()->addDays(2),
        ];
    }
}
