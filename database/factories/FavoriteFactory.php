<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Library;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
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
            'user_id' => User::factory(['library_id' => $library]),
            'book_id' => Book::factory(['library_id' => $library]),
        ];
    }
}
