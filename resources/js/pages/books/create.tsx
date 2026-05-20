import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, RotateCcw, BookPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboard } from "@/routes";
import books from "@/routes/books";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageProps {
    library_id: number;
    authors: string[];
    publishers: string[];
    categories: string[];
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const bookSchema = z.object({
    isbn: z.string().regex(/^[0-9-]+$/, "ISBN must contain only numbers and dashes"),
    title: z.string().min(1, "Title is required"),
    publisher: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    publication_year: z
        .number("Must be a number")
        .int()
        .min(1000, "Enter a valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future"),
    stock_total: z
        .number("Must be a number")
        .int()
        .min(0, "Stock cannot be negative")
        .default(0),
});

type BookFormValues = z.infer<typeof bookSchema>;

// ─── Searchable Select ────────────────────────────────────────────────────────

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
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                <Check
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
                                    <Check
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

// ─── Field Error ──────────────────────────────────────────────────────────────

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-sm text-destructive mt-1">{message}</p>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookCreatePage({ library_id, authors, publishers, categories }: { library_id: number, authors: any, publishers: any, categories: any }) {
    const defaultValues: BookFormValues = {
        isbn: "",
        title: "",
        publisher: null,
        author: null,
        category: null,
        publication_year: new Date().getFullYear(),
        stock_total: 0,
    };

    const form = useForm({
        defaultValues,
        validatorAdapter: zodValidator(),
        validators: {
            onSubmit: bookSchema,
        },
        onSubmit: async ({ value }) => {
            router.post("/books", {
                ...value,
                library_id,
            });
        },
    });

    const handleReset = () => {
        form.reset();
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                        <BookPlus className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Add New Book</h1>
                        <p className="text-sm text-muted-foreground">
                            Fill in the details below to add a book to the library.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border bg-card shadow-sm p-6 space-y-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        {/* Title */}
                        <form.Field name="isbn">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor={field.name}>
                                        ISBN <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="e.g. 1-142-1657-1"
                                        className={cn(
                                            field.state.meta.errors.length > 0 &&
                                            "border-destructive focus-visible:ring-destructive"
                                        )}
                                    />
                                    <FieldError
                                        message={field.state.meta.errors.join(', ')}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Title */}
                        <form.Field name="title">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label htmlFor={field.name}>
                                        Title <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder="e.g. The Great Gatsby"
                                        className={cn(
                                            field.state.meta.errors.length > 0 &&
                                            "border-destructive focus-visible:ring-destructive"
                                        )}
                                    />
                                    <FieldError
                                        message={field.state.meta.errors.join(', ')}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Author */}
                        <form.Field name="author">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Author</Label>
                                    <SearchableSelect
                                        options={authors}
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        placeholder="Select an author"
                                        searchPlaceholder="Search authors..."
                                        error={field.state.meta.errors.join(', ')}
                                    />
                                    <FieldError
                                        message={field.state.meta.errors.join(', ')}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Publisher */}
                        <form.Field name="publisher">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Publisher</Label>
                                    <SearchableSelect
                                        options={publishers}
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        placeholder="Select a publisher"
                                        searchPlaceholder="Search publishers..."
                                        error={field.state.meta.errors.join(', ')}
                                    />
                                    <FieldError
                                        message={field.state.meta.errors.join(', ')}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Category */}
                        <form.Field name="category">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <Label>Category</Label>
                                    <SearchableSelect
                                        options={categories}
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        placeholder="Select a category"
                                        searchPlaceholder="Search categories..."
                                        error={field.state.meta.errors.join(', ')}
                                    />
                                    <FieldError
                                        message={field.state.meta.errors.join(', ')}
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Publication Year & Stock — side by side */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Publication Year */}
                            <form.Field name="publication_year">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>
                                            Publication Year{" "}
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(Number(e.target.value))
                                            }
                                            onBlur={field.handleBlur}
                                            placeholder={String(new Date().getFullYear())}
                                            min={1000}
                                            max={new Date().getFullYear()}
                                            className={cn(
                                                field.state.meta.errors.length > 0 &&
                                                "border-destructive focus-visible:ring-destructive"
                                            )}
                                        />
                                        <FieldError
                                            message={field.state.meta.errors.join(', ')}
                                        />
                                    </div>
                                )}
                            </form.Field>

                            {/* Stock Total */}
                            <form.Field name="stock_total">
                                {(field) => (
                                    <div className="space-y-1.5">
                                        <Label htmlFor={field.name}>
                                            Stock Total{" "}
                                            <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) =>
                                                field.handleChange(Number(e.target.value))
                                            }
                                            onBlur={field.handleBlur}
                                            placeholder="0"
                                            min={0}
                                            className={cn(
                                                field.state.meta.errors.length > 0 &&
                                                "border-destructive focus-visible:ring-destructive"
                                            )}
                                        />
                                        <FieldError
                                            message={field.state.meta.errors.join(', ')}
                                        />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </Button>
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                            >
                                {([canSubmit, isSubmitting]) => (
                                    <Button
                                        type="submit"
                                        disabled={!canSubmit || isSubmitting}
                                        className="gap-2"
                                    >
                                        <BookPlus className="w-4 h-4" />
                                        {isSubmitting ? "Saving..." : "Add Book"}
                                    </Button>
                                )}
                            </form.Subscribe>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
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
