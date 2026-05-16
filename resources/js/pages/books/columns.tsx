"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Book } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { LucideArrowUpDown, LucideEllipsis, LucideEye, LucidePencil, LucideStar, LucideTrash } from "lucide-react";

export const columns: ColumnDef<Book>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="flex gap-4">
                <img className="h-20" src="https://i.pinimg.com/1200x/28/80/09/288009b140adb9df71b7f5fcb0353ac5.jpg" alt="book-cover" />
                <div className="flex flex-col gap-2">
                    <h6 className="font-bold text-lg">{row.getValue("title")}</h6>
                    <span className="text-(--color-muted-foreground) text-xs">ISBN: {row.original.isbn}</span>
                </div>
            </div>
        )
    },
    {
        accessorKey: "author.name",
        header: "Author"
    },
    {
        accessorKey: "average_rating",
        header: ({ column }) => (
            <Button
                variant={"ghost"}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Rating
                <LucideArrowUpDown />
            </Button>
        ),
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
    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className="flex size-8 text-muted-foreground data[state=open]:bg-muted"
                        size={"icon"}
                    >
                        <LucideEllipsis />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>
                        <LucideEye />
                        Detail
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LucidePencil />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                        <LucideTrash />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
]
