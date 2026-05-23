import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { dashboard } from "@/routes";
import books, { store } from "@/routes/books";
import { Form, Head, router, usePage } from "@inertiajs/react";
import { LucideBookPlus, LucideCheck, LucideChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { register } from "module";
import { toast } from "sonner";

const formSchema = z.object({
    library_id: z.number(),
    isbn: z
        .string()
        .min(1, "ISBN must not be empty")
        .regex(/^[0-9-]+$/, "ISBN must contain only numbers and dashes"),
    title: z.string().min(1, "Title is required"),
    author: z.string().nullable().optional(),
    publisher: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    publication_year: z
        .coerce
        .number<number>("Must be a number")
        .int()
        .min(1000, "Enter a valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
    stock_total: z
        .coerce
        .number<number>("Must be a number")
        .int()
        .min(0, "Stock cannot be negative")
});

type BookFormValues = z.infer<typeof formSchema>;

interface SearchableSelectProps {
    options: any[];
    value: string | null | undefined;
    onChange: (value: string | null) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    error?: string;
}

function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    searchPlaceholder = "Search...",
    error,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-full justify-between font-normal",
                        !value && "text-muted-foreground",
                        error && "border-destructive focus-visible:ring-destructive"
                    )}
                >
                    {value ?? placeholder}
                    <LucideChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {/* Allow clearing */}
                            <CommandItem
                                value="__clear__"
                                onSelect={() => {
                                    onChange(null);
                                    setOpen(false);
                                }}
                                className="text-muted-foreground italic"
                            >
                                <LucideCheck
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value == null ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                None
                            </CommandItem>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.name}
                                    value={opt.name}
                                    onSelect={() => {
                                        onChange(opt.name === value ? null : opt.name);
                                        setOpen(false);
                                    }}
                                >
                                    <LucideCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === opt.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {opt.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default function BookCreatePage() {
    const { library_id, authors, publishers, categories } = usePage().props;

    const defaultValues: BookFormValues = {
        library_id: Number(library_id),
        isbn: "",
        title: "",
        author: null,
        publisher: null,
        category: null,
        publication_year: new Date().getFullYear(),
        stock_total: 0
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("Submited data: ", data);
        router.post(books.index(), data, {
            onProgress: () => {
                toast.loading("Creating book...");
            },
            onSuccess: () => {
                toast.success("Book created!");
            },
            onError: (errors) => {
                toast.error("There's something wrong.");
                console.log("Failed request: ", errors);
            }
        });
    }

    return (
        <>
            <Card className="w-full sm:max-w-md mx-auto mt-10">
                <CardHeader className="flex gap-4 items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                        <LucideBookPlus className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <CardTitle>Add New Book</CardTitle>
                        <CardDescription>
                            Fill in the details below to add a book to the library.
                        </CardDescription>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent>
                    <form id="create-book-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="isbn"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="isbn">
                                            ISBN
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="isbn"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Book ISBN"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="title"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="title">
                                            Title
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Book title"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="author"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="author">
                                            Author
                                        </FieldLabel>
                                        <SearchableSelect
                                            options={authors}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select an author"
                                            searchPlaceholder="Search authors..."
                                            error={fieldState.error}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="publisher"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="publisher">
                                            Publisher
                                        </FieldLabel>
                                        <SearchableSelect
                                            options={publishers}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select an publisher"
                                            searchPlaceholder="Search publishers..."
                                            error={fieldState.error}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="category"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="category">
                                            Category
                                        </FieldLabel>
                                        <SearchableSelect
                                            options={categories}
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder="Select an category"
                                            searchPlaceholder="Search categories..."
                                            error={fieldState.error}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {/* PUBLICATION YEAR */}
                                <Controller
                                    name="publication_year"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field aria-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Publication Year
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="number"
                                                placeholder={String(new Date().getFullYear())}
                                                min={1000}
                                                max={new Date().getFullYear()}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* STOCK TOTAL */}
                                <Controller
                                    name="stock_total"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field aria-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Stock Total
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="number"
                                                placeholder="0"
                                                min={0}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
                <Separator />
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="create-book-form">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
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
