"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const description = "An interactive bar chart of borrowing trends";

const chartData = [
    { date: "2026-04-01", borrowing: 222 },
    { date: "2026-04-02", borrowing: 97 },
    { date: "2026-04-03", borrowing: 167 },
    { date: "2026-04-04", borrowing: 242 },
    { date: "2026-04-05", borrowing: 373 },
    { date: "2026-04-06", borrowing: 301 },
    { date: "2026-04-07", borrowing: 245 },
    { date: "2026-04-08", borrowing: 409 },
    { date: "2026-04-09", borrowing: 59 },
    { date: "2026-04-10", borrowing: 261 },
    { date: "2026-04-11", borrowing: 327 },
    { date: "2026-04-12", borrowing: 292 },
    { date: "2026-04-13", borrowing: 342 },
    { date: "2026-04-14", borrowing: 137 },
    { date: "2026-04-15", borrowing: 120 },
    { date: "2026-04-16", borrowing: 138 },
    { date: "2026-04-17", borrowing: 446 },
    { date: "2026-04-18", borrowing: 364 },
    { date: "2026-04-19", borrowing: 243 },
    { date: "2026-04-20", borrowing: 89 },
    { date: "2026-04-21", borrowing: 137 },
    { date: "2026-04-22", borrowing: 224 },
    { date: "2026-04-23", borrowing: 138 },
    { date: "2026-04-24", borrowing: 387 },
    { date: "2026-04-25", borrowing: 215 },
    { date: "2026-04-26", borrowing: 75 },
    { date: "2026-04-27", borrowing: 383 },
    { date: "2026-04-28", borrowing: 122 },
    { date: "2026-04-29", borrowing: 315 },
    { date: "2026-04-30", borrowing: 454 },
]

const chartConfig = {
    borrowing: {
        label: "Borrowing",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function BorrowingTrendsChart() {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = React.useState("30d");

    React.useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date("2026-04-30");
        let daysToSubstract = 30;
        if (timeRange === "15d") {
            daysToSubstract = 15;
        } else if (timeRange === "7d") {
            daysToSubstract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubstract);
        return date >= startDate;
    })

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Total Borrowing</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Total for the last 1 months
                    </span>
                    <span className="@[540px]/card:hidden">Last 1 months</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={timeRange}
                        onValueChange={setTimeRange}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="30d">Last 1 months</ToggleGroupItem>
                        <ToggleGroupItem value="15d">Last 15 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                    </ToggleGroup>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="30d" className="rounded-lg">
                                Last 1 months
                            </SelectItem>
                            <SelectItem value="15d" className="rounded-lg">
                                Last 15 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="h-[300px] lg:h-[200px] w-full">
                    <BarChart accessibilityLayer data={filteredData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip content={<ChartTooltipContent
                            className="w-[150px]"
                            nameKey="borrowing"
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })
                            }}
                        />} />
                        <Bar dataKey={"borrowing"} fill="var(--color-borrowing)" radius={0} />
                        <XAxis
                            dataKey={"date"}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                })
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

