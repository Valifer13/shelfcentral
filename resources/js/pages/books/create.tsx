import { dashboard } from "@/routes";
import books from "@/routes/books";

export default function BookCreatePage() {
    return (
        <>
            <h1>Create book dawg</h1>
        </>
    )
}

BookCreatePage.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
        {
            title: 'Books',
            href: books.index(),
        },
        {
            title: 'Create',
            href: books.create(),
        }
    ],
};
