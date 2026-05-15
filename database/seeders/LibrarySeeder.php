<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Borrow;
use App\Models\Category;
use App\Models\FineSetting;
use App\Models\Library;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create a Super Admin (Global)
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@shelfcentral.com',
            'password' => Hash::make('password'),
            'role' => 'SUPER_ADMIN',
            'library_id' => null,
        ]);

        // 2. Create Sample Libraries
        $libraries = [
            [
                'name' => 'City Central Library',
                'slug' => 'city-central',
                'subscription_plan' => 'ENTERPRISE',
            ],
            [
                'name' => 'Greenwood Public Library',
                'slug' => 'greenwood',
                'subscription_plan' => 'PRO',
            ],
        ];

        foreach ($libraries as $libData) {
            $library = Library::create($libData);

            // Create Fine Settings for the library
            FineSetting::factory()->create(['library_id' => $library->id]);

            // Create Admin for this library
            User::factory()->create([
                'name' => $libData['name'] . ' Admin',
                'email' => 'admin@' . $libData['slug'] . '.com',
                'password' => Hash::make('password'),
                'role' => 'ADMIN',
                'library_id' => $library->id,
            ]);

            // Create Librarians
            User::factory(2)->create([
                'role' => 'LIBRARIAN',
                'library_id' => $library->id,
            ]);

            // Create Members
            $members = User::factory(10)->create([
                'role' => 'MEMBER',
                'library_id' => $library->id,
            ]);

            // Create Categories, Publishers, Authors
            $categories = Category::factory(5)->create(['library_id' => $library->id]);
            $publishers = Publisher::factory(3)->create(['library_id' => $library->id]);
            $authors = Author::factory(10)->create(['library_id' => $library->id]);

            // Create Books
            foreach (range(1, 20) as $i) {
                $book = Book::factory()->create([
                    'library_id' => $library->id,
                    'category_id' => $categories->random()->id,
                    'publisher_id' => $publishers->random()->id,
                    'author_id' => $authors->random()->id,
                ]);

                // Attach 1-3 authors to each book
                // $book->author()->attach($authors->random(rand(1, 3))->pluck('id'));

                // Create 3 copies for each book
                $copies = BookCopy::factory(3)->create([
                    'book_id' => $book->id,
                    'status' => 'AVAILABLE',
                ]);

                // Create some sample borrows for the first few books
                if ($i <= 5) {
                    Borrow::factory()->create([
                        'library_id' => $library->id,
                        'book_copy_id' => $copies->first()->id,
                        'user_id' => $members->random()->id,
                        'status' => 'ONGOING',
                    ]);

                    $copies->first()->update(['status' => 'BORROWED']);
                }

                // Add some reviews and favorites
                // if ($i <= 10) {
                //     \App\Models\Review::factory(rand(1, 3))->create([
                //         'library_id' => $library->id,
                //         'book_id' => $book->id,
                //         'user_id' => $members->random()->id,
                //     ]);

                //     \App\Models\Favorite::factory(rand(1, 5))->create([
                //         'library_id' => $library->id,
                //         'book_id' => $book->id,
                //         'user_id' => $members->random()->id,
                //     ]);
                // }

                // Add some reservations
                if ($i > 15) {
                    \App\Models\Reservation::factory()->create([
                        'library_id' => $library->id,
                        'book_id' => $book->id,
                        'user_id' => $members->random()->id,
                        'status' => 'PENDING',
                    ]);
                }
            }
        }
    }
}
