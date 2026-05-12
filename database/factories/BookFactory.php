<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Library;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
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
            'isbn' => $this->faker->isbn13(),
            'title' => $this->faker->sentence(3),
            'publisher_id' => Publisher::factory(['library_id' => $library]),
            'category_id' => Category::factory(['library_id' => $library]),
            'publication_year' => $this->faker->year(),
            'stock_total' => 10,
            'stock_available' => 10,
            'average_rating' => $this->faker->randomFloat(2, 0, 5),
            'total_reviews' => $this->faker->numberBetween(0, 100),
        ];
    }
}
