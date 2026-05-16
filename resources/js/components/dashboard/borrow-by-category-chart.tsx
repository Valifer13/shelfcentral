import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { Label, Pie, PieChart } from "recharts";

export const description = "A borrowing trend by category";

const chartData: { category: string, percentage: number, fill: string, color: string }[] = [
    {
        category: "Science",
        percentage: 32,
        fill: "var(--color-science)",
        color: "bg-[oklch(77.7%_0.152_181.912)]",
    },
    {
        category: "Self Help",
        percentage: 24,
        fill: "var(--color-selfHelp)",
        color: "bg-[oklch(70.7%_0.165_254.624)]",
    },
    {
        category: "Business",
        percentage: 18,
        fill: "var(--color-business)",
        color: "bg-[oklch(79.2%_0.209_151.711)]",
    },
    {
        category: "Fiction",
        percentage: 14,
        fill: "var(--color-fiction)",
        color: "bg-[oklch(70.4%_0.191_22.216)]",
    },
    {
        category: "Other",
        percentage: 12,
        fill: "var(--color-other)",
        color: "bg-[oklch(70.8%_0_0)]",
    },
]

const chartConfig = {
    science: {
        label: "Science",
        color: "oklch(77.7% 0.152 181.912)",
    },
    selfHelp: {
        label: "Self-Help",
        color: "oklch(70.7% 0.165 254.624)",
    },
    business: {
        label: "Business",
        color: "oklch(79.2% 0.209 151.711)",
    },
    fiction: {
        label: "Fiction",
        color: "oklch(70.4% 0.191 22.216)",
    },
    other: {
        label: "Other",
        color: "oklch(70.8% 0 0)",
    },
} satisfies ChartConfig

export default function BorrowByCategoryChart() {
    const bestCategory = (chartData.sort((a, b) => a.percentage - b.percentage)).at(-1);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Borrows by Category</CardTitle>
                <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent className="flex pb-0 flex-col lg:flex-row gap-5">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square max-h-50"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="percentage"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {bestCategory?.percentage}%
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-foreground"
                                                >
                                                    {bestCategory?.category}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="flex flex-col w-full gap-2">
                    {chartData.reverse().map((data) => {
                        return (
                            <>
                                <Field className="w-full">
                                    <FieldLabel htmlFor={`chart-${data.category.replaceAll(' ', '').toLocaleLowerCase()}`}>
                                        <span>{data.category}</span>
                                        <span className="ml-auto">{data.percentage}%</span>
                                    </FieldLabel>
                                    <Progress value={data.percentage} id={`chart-${data.category.replaceAll(' ', '').toLocaleLowerCase()}`} indicatorClassName={`${data.color}`} />
                                </Field>
                            </>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
