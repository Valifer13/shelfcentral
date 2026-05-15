"use client";

import { Book } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "average_rating",
        header: "Rating"
    },
    {
        accessorKey: "category_id",
        header: "Category"
    },
]