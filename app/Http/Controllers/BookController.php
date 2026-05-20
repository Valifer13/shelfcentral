<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        /* $validated = $request->validate([ */
        /*     'isbn' => 'required|string|max:255', */
        /*     'title' => 'required|string|max:255', */
        /*     'author' => 'string|max:255', */
        /*     'publisher' => 'string|max:255', */
        /*     'category' => 'string|max:255', */
        /*     'publication_year' => '' */
        /* ]); */

        $validated = $request->validate([
            'library_id'       => ['required', 'integer'],
            'isbn'             => ['required', 'regex:/^[0-9-]+$/'],
            'title'            => ['required', 'string', 'max:255'],
            'author'           => ['string', 'max:255'],
            'publisher'        => ['string', 'max:255'],
            'category'         => ['string', 'max:255'],
            'publication_year' => ['required', 'date_format:Y', 'min:1000', 'max:' . date('Y')],
            'stock_total'      => ['nullable', 'integer', 'min:0'],
        ]);

        dd($validated);

        $author_id = Author::where('name', $validated)->get();

        $book = Book::create([]);

        return to_route('books.index', ['book' => $book->id]);
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
