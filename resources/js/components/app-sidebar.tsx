import { Link } from '@inertiajs/react';
import { ArrowLeftRight, BarChart2, BookMarked, BookOpen, Building2, ClipboardList, Copy, DollarSign, FolderGit2, Heart, LayoutGrid, Settings, Shield, Star, Tag, User, UserCog, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { NavSettings } from './nav-settings';
import books from '@/routes/books';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Books',
        href: books.index(),
        icon: BookOpen,
    },
    {
        title: 'Categories',
        href: '#',
        icon: Tag,
    },
    {
        title: 'Authors',
        href: '#',
        icon: User,
    },
    {
        title: 'Publishers',
        href: '#',
        icon: Building2,
    },
    {
        title: 'Book Copies',
        href: '#',
        icon: Copy,
    },
    {
        title: 'Borrowings',
        href: '#',
        icon: ArrowLeftRight,
    },
    {
        title: 'Reservations',
        href: '#',
        icon: BookMarked,
    },
    {
        title: 'Members',
        href: '#',
        icon: Users,
    },
    {
        title: 'Reviews',
        href: '#',
        icon: Star,
    },
    {
        title: 'Favorites',
        href: '#',
        icon: Heart,
    },
    {
        title: 'Analytics',
        href: '#',
        icon: BarChart2,
    },
    {
        title: 'Audit Logs',
        href: '#',
        icon: ClipboardList,
    },
];

const settingNavItems: NavItem[] = [
    {
        title: 'Library Settings',
        href: '#',
        icon: Settings,
    },
    {
        title: 'Fine Settings',
        href: '#',
        icon: DollarSign,
    },
    {
        title: 'Staff Management',
        href: '#',
        icon: UserCog,
    },
    {
        title: 'Roles & Permissions',
        href: '#',
        icon: Shield,
    },
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarContent>
                <NavSettings items={settingNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
