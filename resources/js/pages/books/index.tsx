import books from "@/routes/books";
import { Head } from "@inertiajs/react"

export default function BookIndexPage() {
    return (
        <>
            <Head title="Book" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>This is book page</h1>
            </div>
        </>
    )
}

BookIndexPage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: books.index(),
        },
    ],
};
