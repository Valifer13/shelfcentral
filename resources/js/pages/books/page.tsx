import books from "@/routes/books";
import { Head } from "@inertiajs/react"
import { BookTable } from "./book-table";
import { columns } from "./columns";
import { dashboard } from "@/routes";

export default function BookIndexPage({ books }: { books: any }) {
    console.log(books);
    return (
        <>
            <Head title="Book" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="container mx-auto py-10">
                    <BookTable columns={columns} data={books} />
                </div>
            </div>
        </>
    )
}

BookIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Books',
            href: books.index(),
        },
    ],
};
