export type Book = {
    id: number,
    library_id: number,
    isbn: string,
    title: string,
    publisher_id?: number | null,
    category_id?: number | null,
    publication_year: string,
    stock_total: number,
    stock_available: number,
    average_rating: string,
    total_review: 42,
    created_at: Date,
    updated_at: Date,
    deleted_at?: Date | null,

    category: Category,
    author: Author
}

export type Category = {
    id: number,
    library_id: number,
    name: string
}

export type Author = {
    id: number,
    library_id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}

export type Publisher = {
    id: number,
    library_id: number,
    name: string,
    created_at: Date,
    updated_at: Date
}