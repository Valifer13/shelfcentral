"use client";

import { Badge } from "@/components/ui/badge";
import { Book } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { LucideStar } from "lucide-react";

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "average_rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                    <LucideStar size={16} strokeWidth={3} />
                    {row.getValue("average_rating")}
                </Badge>
            </div>
        )
    },
    {
        accessorKey: "category.name",
        header: "Category"
    },
]