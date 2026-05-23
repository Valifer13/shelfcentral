<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::query()
            ->with(['category', 'author'])
            ->latest()
            ->get();

        return Inertia::render('books/page', [
            'books' => $books,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $library_id = Auth::user()->library_id;
        $categories = Category::all(['id', 'name']);
        $authors    = Author::all(['id', 'name']);
        $publishers = Publisher::all(['id', 'name']);

        return Inertia::render('books/create', [
            'library_id' => $library_id,
            'categories' => $categories,
            'authors'    => $authors,
            'publishers' => $publishers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'library_id'       => ['required', 'integer', 'exists:libraries,id'],
            'isbn'             => ['required', 'regex:/^[0-9-]+$/', 'unique:books,isbn'],
            'title'            => ['required', 'string', 'max:255'],
            'author'           => ['nullable', 'string', 'max:255'],
            'publisher'        => ['nullable', 'string', 'max:255'],
            'category'         => ['nullable', 'string', 'max:255'],
            'publication_year' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],
            'stock_total'      => ['nullable', 'integer', 'min:0'],
        ]);

        DB::transaction(function () use ($validated) {
            $author_id = Author::where('name', $validated['author'])->value('id');
            $publisher_id = Publisher::where('name', $validated['publisher'])->value('id');
            $category_id = Category::where('name', $validated['category'])->value('id');

            $book = Book::create([
                'library_id' => $validated['library_id'],
                'isbn' => $validated['isbn'],
                'title' => $validated['title'],
                'author_id' => $author_id,
                'publisher_id' => $publisher_id,
                'category_id' => $category_id,
                'publication_year' => (string) $validated['publication_year'],
                'stock_total' => $validated['stock_total'] ?? 0,
            ]);
        });

        return to_route('books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
