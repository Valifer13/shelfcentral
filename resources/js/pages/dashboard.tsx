import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideBookOpen, LucideArrowLeftRight, LucideInfo, LucideTrendingUp, LucideUsers, LucideTrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BorrowingTrendsChart } from '@/components/dashboard/borrowing-trends-chart';
import BorrowByCategoryChart from '@/components/dashboard/borrow-by-category-chart';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="@container/card">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-purple-500/20 text-sidebar-primary-foreground">
                                <LucideBookOpen className="size-5 text-purple-500" />
                            </div>
                            <Badge className="h-fit bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                <LucideTrendingUp />
                                +142
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Total Books</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">12,480</CardTitle>
                        </CardContent>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-emerald-500/20 text-sidebar-primary-foreground">
                                <LucideArrowLeftRight className="size-5 text-emerald-500" />
                            </div>
                            <Badge className="h-fit bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                <LucideTrendingUp />
                                +18
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Total Books</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">384</CardTitle>
                        </CardContent>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-red-500/20 text-sidebar-primary-foreground">
                                <LucideInfo className="size-5 text-red-500" />
                            </div>
                            <Badge className="h-fit bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                                <LucideTrendingDown />
                                +3
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Total Books</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">47</CardTitle>
                        </CardContent>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-md bg-blue-500/20 text-sidebar-primary-foreground">
                                <LucideUsers className="size-5 text-blue-500" />
                            </div>
                            <Badge className="h-fit bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                <LucideTrendingUp />
                                +29
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Total Books</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">2,941</CardTitle>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid md:grid-cols-[1.6fr_1fr] gap-5 relative overflow-hidden">
                    {/* <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border" /> */}
                    <BorrowingTrendsChart />
                    <BorrowByCategoryChart />
                </div>
                <div className="grid md:grid-cols-[1.6fr_1fr] gap-5 relative overflow-hidden">
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border" />
                    <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
