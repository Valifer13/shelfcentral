import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";
import { Label, Pie, PieChart } from "recharts";

export const description = "A borrowing trend by category";

const chartData: { category: string, percentage: number, fill: string }[] = [
    { category: "Science", percentage: 32, fill: "var(--color-science)" },
    { category: "Self-Help", percentage: 24, fill: "var(--color-selfHelp)" },
    { category: "Business", percentage: 18, fill: "var(--color-business)" },
    { category: "Fiction", percentage: 14, fill: "var(--color-fiction)" },
    { category: "Other", percentage: 12, fill: "var(--color-other)" },
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
                    className="aspect-square max-h-[200px]"
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
                <div className="w-full gap-5">
                    {chartData.map((data) => {
                        return (
                            <>
                                <Field className="w-full">
                                    <FieldLabel htmlFor="progress-upload">
                                        <span>{data.category}</span>
                                        <span className="ml-auto">{data.percentage}%</span>
                                    </FieldLabel>
                                    <Progress value={data.percentage} id="progress-upload" />
                                </Field>
                            </>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
