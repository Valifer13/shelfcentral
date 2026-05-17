import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { dashboard } from "@/routes";
import books from "@/routes/books";
import { Head } from "@inertiajs/react";
import { useForm } from "@tanstack/react-form";
import { LucideBook } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    library_id: z.number(),

    isbn: z
        .string()
        .regex(/^[0-9-]+$/, "ISBN must contain only numbers and dashes"),

    title: z
        .string()
        .trim()
        .min(1, "Title must not be empty"),

    publisher: z.string().nullable(),
    author: z.string().nullable(),
    category: z.string().nullable(),

    publication_year: z
        .coerce
        .number()
        .min(1000, "Invalid Year")
        .max(new Date().getFullYear(), "Year can't be in the future"),

    stock_total: z
        .coerce
        .number()
        .min(0, "Stock can't be negative")
});

export default function BookCreatePage({ 
    library_id,
    authors,
    publishers,
    categories
}: {
    library_id: number
    authors: any,
    publishers: any,
    categories: any
}) {
    const defaultValues = {
        library_id: Number(library_id),
        isbn: "",
        title: "",
        publisher: null as string | null,
        author: null as string | null,
        category: null as string | null,
        publication_year: 0,
        stock_total: 0,
    } satisfies z.infer<typeof formSchema>;

    const form = useForm({
        defaultValues,
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            toast.success("Form submitted successfully");
        }
    });

    return (
        <>
            <Head title="Book" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="min-w-lg mx-auto">
                    <CardHeader className="flex gap-4 items-center">
                        <LucideBook color="blue" className="bg-blue-900/40 p-2 rounded-sm" size={40} />
                        <div className="flex flex-col gap-2">
                            <CardTitle>Add New Book</CardTitle>
                            <CardDescription>Add new book into the library.</CardDescription>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <form
                            id="create-book-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                form.handleSubmit();
                            }}
                        >
                            <FieldGroup>
                                <div className="flex gap-4 items-center">
                                    <form.Field
                                        name="isbn"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>ISBN</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="0-321-65432-1"
                                                        autoComplete="off"
                                                    />
                                                </Field>
                                            )
                                        }}
                                    />
                                    <form.Field
                                        name="title"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Title of the book"
                                                        autoComplete="off"
                                                    />
                                                </Field>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <form.Field
                                        name="publisher"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Publisher</FieldLabel>
                                                    <Combobox items={publishers}>
                                                        <ComboboxInput placeholder={`Select a publisher`} showClear />
                                                        <ComboboxContent>
                                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                            <ComboboxList>
                                                                {(item) => (
                                                                    <ComboboxItem key={item.name} value={item.name} onSelect={(value) => {
                                                                        field.handleChange(value);
                                                                    }}>
                                                                        {item.name}
                                                                    </ComboboxItem>
                                                                )}
                                                            </ComboboxList>
                                                        </ComboboxContent>
                                                    </Combobox>
                                                </Field>
                                            )
                                        }}
                                    />
                                    <form.Field
                                        name="author"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                                                    <Combobox items={authors}>
                                                        <ComboboxInput placeholder={`Select a author`} showClear />
                                                        <ComboboxContent>
                                                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                            <ComboboxList>
                                                                {(item) => (
                                                                    <ComboboxItem key={item.name} value={item.name} onSelect={(value) => {
                                                                        field.handleChange(value);
                                                                    }}>
                                                                        {item.name}
                                                                    </ComboboxItem>
                                                                )}
                                                            </ComboboxList>
                                                        </ComboboxContent>
                                                    </Combobox>
                                                </Field>
                                            )
                                        }}
                                    />
                                </div>
                                <form.Field
                                    name="category"
                                    children={(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                                <Combobox items={categories}>
                                                    <ComboboxInput placeholder={`Select a category`} showClear />
                                                    <ComboboxContent>
                                                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                                                        <ComboboxList>
                                                            {(item) => (
                                                                <ComboboxItem key={item.name} value={item.name} onSelect={(value) => {
                                                                    field.handleChange(value);
                                                                }}>
                                                                    {item.name}
                                                                </ComboboxItem>
                                                            )}
                                                        </ComboboxList>
                                                    </ComboboxContent>
                                                </Combobox>
                                            </Field>
                                        )
                                    }}
                                />
                                <div className="flex items-center gap-4">
                                    <form.Field
                                        name="publication_year"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Publication Year</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type="number"
                                                        min={1000}
                                                        max={new Date().getFullYear()}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Publication Year"
                                                        autoComplete="off"
                                                    />
                                                </Field>
                                            )
                                        }}
                                    />
                                    <form.Field
                                        name="stock_total"
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Stock Total</FieldLabel>
                                                    <Input
                                                        id={field.name}
                                                        name={field.name}
                                                        type="number"
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        aria-invalid={isInvalid}
                                                        placeholder="Stock total of the book"
                                                        autoComplete="off"
                                                    />
                                                </Field>
                                            )
                                        }}
                                    />
                                </div>
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <Separator />
                    <CardFooter>
                        <Field orientation="horizontal" className="justify-end">
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit" form="create-book-form">
                                Submit
                            </Button>
                        </Field>
                    </CardFooter>
                </Card>
            </div>
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
