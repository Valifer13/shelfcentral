import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Menu,
    X,
    ChevronDown,
    BookOpen,
    Grid,
    ShieldCheck,
    Clock,
    Check,
    Search,
    Plus,
    LayoutDashboard,
    Users,
    RefreshCcw,
    Bookmark,
    DollarSign,
    BarChart2,
    ClipboardList,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

export default function LandingPage({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeTab, setActiveTab] = useState('ov');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const year = new Date().getFullYear();
    const { auth } = usePage().props;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for fade-in animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            'opacity-100',
                            'translate-y-0',
                        );
                        entry.target.classList.remove(
                            'opacity-0',
                            'translate-y-4',
                        );
                    }
                });
            },
            { threshold: 0.1 },
        );

        document
            .querySelectorAll('.animate-on-scroll')
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white font-['Instrument_Sans'] text-[#0d0d0d] antialiased selection:bg-[#BAED91] selection:text-[#2D5012]">
            <Head title="Modern Library Management" />

            {/* Navigation */}
            <nav
                id="nav"
                className={`fixed top-0 right-0 left-0 z-[99] border-b transition-all duration-300 ${isScrolled
                        ? 'border-black/10 bg-white/90 backdrop-blur-md'
                        : 'border-transparent bg-transparent'
                    }`}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 text-lg font-bold tracking-tight"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#BAED91]">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                >
                                    <rect
                                        x="1"
                                        y="2"
                                        width="12"
                                        height="2"
                                        rx=".8"
                                        fill="#0d0d0d"
                                    />
                                    <rect
                                        x="1"
                                        y="6"
                                        width="9"
                                        height="2"
                                        rx=".8"
                                        fill="#0d0d0d"
                                        className="opacity-70"
                                    />
                                    <rect
                                        x="1"
                                        y="10"
                                        width="10"
                                        height="2"
                                        rx=".8"
                                        fill="#0d0d0d"
                                        className="opacity-50"
                                    />
                                </svg>
                            </div>
                            <span
                                className={`${isScrolled ? 'text-black' : 'text-white'}`}
                            >
                                Shelfcentral
                            </span>
                        </Link>

                        <div className="hidden items-center gap-1 md:flex">
                            {['Features', 'Pricing', 'FAQ', 'Docs'].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${isScrolled ? 'text-ink hover:bg-ink! hover:text-white' : 'text-ink-3 hover:bg-surface hover:text-ink'}`}
                                    >
                                        {item}
                                    </a>
                                ),
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="primary-btn"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className={`default-btn ${isScrolled ? 'border-ink-3! text-ink hover:border-transparent hover:bg-ink! hover:text-white' : 'border-ink-3! text-ink-4 hover:border-transparent hover:text-black'}`}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="primary-btn"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                            <button
                                className="p-2 text-[#0d0d0d] md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? (
                                    <X size={20} />
                                ) : (
                                    <Menu size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 top-16 z-[98] origin-top bg-[#111] transition-all duration-300 md:hidden ${isMenuOpen
                        ? 'scale-y-100 opacity-100'
                        : 'pointer-events-none scale-y-0 opacity-0'
                    }`}
            >
                <div className="flex flex-col gap-2 px-6 py-8">
                    {['Features', 'Pricing', 'FAQ', 'Docs'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="border-b border-white/5 py-4 text-lg font-medium text-white/60"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <Link
                        href="/register"
                        className="mt-6 rounded-xl bg-[#BAED91] py-4 text-center font-bold text-[#2D5012]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Start Free
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section
                id="hero"
                className="relative overflow-hidden bg-[#0d0d0d] pt-32 pb-24 lg:pt-48 lg:pb-32"
            >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(186,237,145,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(186,237,145,.04)_1px,transparent_1px)] bg-[length:48px_48px]"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-[#BAED91]/20 bg-[#BAED91]/10 px-4 py-1.5 text-xs font-semibold text-[#BAED91]">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#BAED91]"></span>
                            Barcode scanning & auto-fines included
                        </div>
                        <h1 className="mb-6 text-5xl leading-[1.05] font-bold tracking-tight text-white lg:text-7xl">
                            Library management,
                            <br />
                            <em className="font-instrument-serif font-normal text-[#BAED91] italic">
                                finally modernized
                            </em>
                        </h1>
                        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/50">
                            Catalog, borrow, track, and analyze — everything
                            your library needs in one clean, centralized
                            platform.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/register"
                                className="rounded-xl bg-[#BAED91] px-8 py-3.5 text-base font-bold text-[#2D5012] shadow-xl transition-all hover:-translate-y-0.5 hover:bg-[#9BD26E] active:translate-y-0"
                            >
                                Start Free →
                            </Link>
                            <a
                                href="#showcase"
                                className="rounded-xl border border-white/10 px-8 py-3.5 text-base font-semibold text-white/60 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white"
                            >
                                View demo
                            </a>
                        </div>
                    </div>

                    {/* Mockup */}
                    <div className="animate-float relative mx-auto mt-20 max-w-5xl">
                        {/* Floating Stats */}
                        <div className="animate-float-delay-1 absolute top-10 -left-4 z-20 hidden rounded-2xl border border-white/10 bg-[#121212]/60 p-4 shadow-2xl backdrop-blur-xl lg:block">
                            <div className="mb-1 text-xl">📚</div>
                            <div className="text-2xl font-bold text-white">
                                12,480
                            </div>
                            <div className="mt-1 text-[10px] tracking-widest text-white/40 uppercase">
                                Books catalogued
                            </div>
                        </div>
                        <div className="animate-float-delay-2 absolute top-24 -right-4 z-20 hidden rounded-2xl border border-white/10 bg-[#121212]/60 p-4 shadow-2xl backdrop-blur-xl lg:block">
                            <div className="mb-1 text-xl text-[#BAED91]">
                                ⚡
                            </div>
                            <div className="text-2xl font-bold text-white">
                                98.6%
                            </div>
                            <div className="mt-1 text-[10px] tracking-widest text-white/40 uppercase">
                                On-time returns
                            </div>
                        </div>

                        <div className="rotate-x-[2.5deg] transform overflow-hidden rounded-2xl border border-white/10 bg-[#161616] shadow-[0_40px_80px_rgba(0,0,0,0.6)] perspective-[1100px]">
                            <div className="flex items-center gap-3 border-b border-white/5 bg-[#111] px-5 py-3.5">
                                <div className="flex gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]"></div>
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"></div>
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]"></div>
                                </div>
                                <div className="flex-1 rounded-md bg-white/5 px-4 py-1 text-center font-mono text-[10px] text-white/30">
                                    app.shelfcentral.io/dashboard
                                </div>
                            </div>
                            <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-[200px_1fr]">
                                <aside className="hidden border-r border-white/5 bg-white/[0.02] p-4 md:block">
                                    <div className="mb-6 flex items-center gap-2 text-xs font-bold text-white">
                                        <div className="h-5 w-5 shrink-0 rounded-md bg-[#BAED91]"></div>
                                        Shelfcentral
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2.5 rounded-lg bg-[#BAED91]/10 px-3 py-2 text-[11px] font-semibold text-[#BAED91]">
                                            <LayoutDashboard size={14} />{' '}
                                            Overview
                                        </div>
                                        {[
                                            'Books',
                                            'Members',
                                            'Borrowings',
                                            'Reservations',
                                            'Fines',
                                            'Analytics',
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-[11px] text-white/30 transition-colors hover:text-white/50"
                                            >
                                                <div className="h-3.5 w-3.5 opacity-60">
                                                    {item === 'Books' && (
                                                        <BookOpen size={14} />
                                                    )}
                                                    {item === 'Members' && (
                                                        <Users size={14} />
                                                    )}
                                                    {item === 'Borrowings' && (
                                                        <RefreshCcw size={14} />
                                                    )}
                                                    {item ===
                                                        'Reservations' && (
                                                            <Bookmark size={14} />
                                                        )}
                                                    {item === 'Fines' && (
                                                        <DollarSign size={14} />
                                                    )}
                                                    {item === 'Analytics' && (
                                                        <BarChart2 size={14} />
                                                    )}
                                                </div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </aside>
                                <main className="flex flex-col gap-6 p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-bold text-white">
                                            Library Overview
                                        </h3>
                                        <span className="text-[10px] text-white/30">
                                            May 2025
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                                        {[
                                            {
                                                label: 'Books',
                                                val: '12,480',
                                                sub: '+142 this month',
                                            },
                                            {
                                                label: 'Active Borrows',
                                                val: '384',
                                                sub: '+18 today',
                                            },
                                            {
                                                label: 'Members',
                                                val: '2,941',
                                                sub: '+29 this week',
                                            },
                                            {
                                                label: 'Overdue',
                                                val: '47',
                                                sub: '↑ 3 since yesterday',
                                                alert: true,
                                            },
                                        ].map((card) => (
                                            <div
                                                key={card.label}
                                                className="rounded-xl border border-white/5 bg-white/[0.04] p-3.5"
                                            >
                                                <div className="mb-2 text-[9px] tracking-widest text-white/30 uppercase">
                                                    {card.label}
                                                </div>
                                                <div
                                                    className={`text-xl font-bold ${card.alert ? 'text-[#f87171]' : 'text-white'}`}
                                                >
                                                    {card.val}
                                                </div>
                                                <div
                                                    className={`mt-1.5 text-[9px] ${card.alert ? 'text-[#f87171]' : 'text-[#BAED91]'}`}
                                                >
                                                    {card.sub}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rounded-xl border border-white/5 bg-white/[0.04] p-4">
                                        <div className="mb-4 text-[9px] tracking-widest text-white/30 uppercase">
                                            Borrowing activity — last 14 days
                                        </div>
                                        <div className="flex h-16 items-end gap-1">
                                            {[
                                                38, 55, 33, 72, 48, 62, 44, 88,
                                                55, 70, 45, 82, 60, 100,
                                            ].map((h, i) => (
                                                <div
                                                    key={i}
                                                    style={{ height: `${h}%` }}
                                                    className={`flex-1 rounded-t-[2px] ${h > 70 ? 'bg-[#BAED91]' : 'bg-[#BAED91]/20'}`}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.04]">
                                        <table className="w-full text-left text-[11px]">
                                            <thead className="border-b border-white/5 text-white/30">
                                                <tr>
                                                    <th className="px-4 py-2.5 text-[9px] font-medium tracking-widest uppercase">
                                                        Book
                                                    </th>
                                                    <th className="px-4 py-2.5 text-[9px] font-medium tracking-widest uppercase">
                                                        Borrower
                                                    </th>
                                                    <th className="px-4 py-2.5 text-[9px] font-medium tracking-widest uppercase">
                                                        Due
                                                    </th>
                                                    <th className="px-4 py-2.5 text-[9px] font-medium tracking-widest uppercase">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-white/50">
                                                {[
                                                    {
                                                        title: 'Deep Work',
                                                        name: 'J. Santos',
                                                        date: 'May 14',
                                                        status: 'Active',
                                                        type: 'ok',
                                                    },
                                                    {
                                                        title: 'Atomic Habits',
                                                        name: 'L. Reyes',
                                                        date: 'Apr 30',
                                                        status: 'Overdue',
                                                        type: 'ov',
                                                    },
                                                    {
                                                        title: 'The Lean Startup',
                                                        name: 'M. Cruz',
                                                        date: 'May 20',
                                                        status: 'Reserved',
                                                        type: 'rs',
                                                    },
                                                ].map((row, i) => (
                                                    <tr
                                                        key={i}
                                                        className="border-b border-white/[0.03] last:border-0"
                                                    >
                                                        <td className="px-4 py-3 font-medium text-white/80">
                                                            {row.title}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {row.name}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {row.date}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span
                                                                className={`rounded-md px-2 py-0.5 text-[9px] font-bold ${row.type ===
                                                                        'ok'
                                                                        ? 'bg-[#BAED91]/10 text-[#BAED91]'
                                                                        : row.type ===
                                                                            'ov'
                                                                            ? 'bg-red-500/10 text-red-400'
                                                                            : 'bg-indigo-500/10 text-indigo-300'
                                                                    }`}
                                                            >
                                                                {row.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section
                id="trust"
                className="border-t border-white/10 bg-[#0d0d0d] pt-15 pb-0"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <div className="relative z-20 -mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: <ShieldCheck size={18} />,
                                title: 'Multi-tenant',
                                desc: 'Isolated data per institution.',
                            },
                            {
                                icon: <Grid size={18} />,
                                title: 'Barcode-ready',
                                desc: 'Works with standard scanners.',
                            },
                            {
                                icon: <ClipboardList size={18} />,
                                title: 'Audit logging',
                                desc: 'Every action, fully traceable.',
                            },
                            {
                                icon: <Clock size={18} />,
                                title: 'Built for institutions',
                                desc: 'Schools, universities, libraries.',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 bg-[#0d0d0d] p-7"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#BAED91]/10 text-[#BAED91]">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="mb-1.5 text-sm font-bold text-white">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs leading-relaxed text-white/30">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className="bg-[#f8f8f6]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-[#767676] uppercase">
                            The problem
                        </span>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                            Traditional libraries run on friction
                        </h2>
                        <p className="max-w-xl text-lg leading-relaxed text-[#767676]">
                            Manual processes, lost records, and uncollected
                            fines are symptoms of a system that hasn't caught
                            up.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="animate-on-scroll translate-y-4 rounded-2xl border border-black/[0.08] bg-white p-8 opacity-0 transition-all delay-100 duration-700">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-lg">
                                    ⚠️
                                </div>
                                <span className="text-sm font-bold">
                                    The old way
                                </span>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    'Manual tracking on paper creates lost records and unresolved disputes over returns.',
                                    'Fines are calculated by hand — slow, error-prone, and easy to miss.',
                                    'No single source of truth; staff juggle spreadsheets, notebooks, and email.',
                                    'Members have no self-service access — every request requires staff time.',
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-bold text-red-500">
                                            ✕
                                        </div>
                                        <p className="text-[14px] leading-relaxed text-[#3a3a3a]">
                                            {text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="animate-on-scroll translate-y-4 rounded-2xl border border-[#BAED91]/40 bg-white p-8 opacity-0 transition-all delay-200 duration-700">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#BAED91]/15 text-lg">
                                    ✅
                                </div>
                                <span className="text-sm font-bold">
                                    The Shelfcentral way
                                </span>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    'Centralized digital catalog with real-time borrowing status and complete history.',
                                    'Automatic fine calculation — policies enforce themselves, zero human error.',
                                    'One platform for catalog, members, reservations, analytics, and more.',
                                    'Member portal for browsing, reserving, and tracking without staff assistance.',
                                ].map((text, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BAED91]/30 text-[10px] font-bold text-[#2D5012]">
                                            ✓
                                        </div>
                                        <p className="text-[14px] leading-relaxed text-[#3a3a3a]">
                                            {text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 text-center opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-[#767676] uppercase">
                            Features
                        </span>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                            Everything your library needs
                        </h2>
                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#767676]">
                            A complete toolkit — nothing extraneous, nothing
                            missing.
                        </p>
                    </div>

                    <div className="animate-on-scroll mt-16 grid translate-y-4 grid-cols-1 gap-px overflow-hidden rounded-3xl border border-black/[0.08] bg-black/[0.08] opacity-0 transition-all duration-700 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: '📚',
                                title: 'Catalog Management',
                                desc: 'Organize books by author, category, publisher, and ISBN. Fast search, bulk import via CSV.',
                            },
                            {
                                icon: '🔄',
                                title: 'Borrow & Return',
                                desc: 'Issue and return books in seconds. Real-time copy-level availability, full borrower history.',
                            },
                            {
                                icon: '💰',
                                title: 'Automatic Fines',
                                desc: 'Define policies per category. Fines accrue automatically on overdue items — no manual work.',
                            },
                            {
                                icon: '🔳',
                                title: 'Barcode Tracking',
                                desc: 'Every copy gets a unique barcode. Scan to issue or return with any standard USB scanner.',
                            },
                            {
                                icon: '🔐',
                                title: 'Role-based Access',
                                desc: 'Admin, Librarian, and Member roles with fine-grained permissions per section.',
                            },
                            {
                                icon: '📋',
                                title: 'Reservation Queue',
                                desc: 'Members reserve books on loan. Auto-notifications when a copy becomes available.',
                            },
                            {
                                icon: '👤',
                                title: 'Member Dashboard',
                                desc: 'Self-service portal: browse catalog, track borrowings, view fines, manage reservations.',
                            },
                            {
                                icon: '⭐',
                                title: 'Reviews & Favorites',
                                desc: 'Members rate and save books. Drives engagement and surfaces popular titles.',
                            },
                            {
                                icon: '🗒️',
                                title: 'Audit Logs',
                                desc: 'A tamper-evident record of every system action. Full accountability for admins.',
                            },
                        ].map((feat, i) => (
                            <div
                                key={i}
                                className="group bg-white p-10 transition-colors hover:bg-[#f8f8f6]"
                            >
                                <div className="mb-6 text-3xl">{feat.icon}</div>
                                <h4 className="mb-3 text-base font-bold transition-colors group-hover:text-[#2D5012]">
                                    {feat.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-[#767676]">
                                    {feat.desc}
                                </p>
                            </div>
                        ))}
                        <div className="group flex flex-col gap-8 bg-white p-10 transition-colors hover:bg-[#f8f8f6] md:flex-row md:items-center lg:col-span-3">
                            <div className="text-4xl">📈</div>
                            <div>
                                <h4 className="mb-2 text-lg font-bold transition-colors group-hover:text-[#2D5012]">
                                    Analytics & Reports
                                </h4>
                                <p className="text-[14px] leading-relaxed text-[#767676]">
                                    Borrowing trends, popular titles, member
                                    activity, fine collection rates. Export to
                                    PDF or CSV.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section id="showcase" className="bg-[#0d0d0d]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 text-center opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase">
                            Dashboard preview
                        </span>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
                            Your library, at a glance
                        </h2>
                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/40">
                            Designed for daily use — fast, clear, and always up
                            to date.
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="mx-auto mb-12 flex w-fit rounded-xl border border-white/5 bg-white/5 p-1">
                            {[
                                { id: 'ov', label: 'Overview' },
                                { id: 'bk', label: 'Books' },
                                { id: 'mb', label: 'Members' },
                                { id: 'an', label: 'Analytics' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`cursor-pointer rounded-lg px-6 py-2.5 text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-[#BAED91] text-[#2D5012] shadow-lg'
                                            : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    {tab.id === 'ov' && (
                                        <div className="flex items-center gap-2">
                                            <LayoutDashboard size={14} />{' '}
                                            {tab.label}
                                        </div>
                                    )}
                                    {tab.id === 'bk' && (
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={14} /> {tab.label}
                                        </div>
                                    )}
                                    {tab.id === 'mb' && (
                                        <div className="flex items-center gap-2">
                                            <Users size={14} /> {tab.label}
                                        </div>
                                    )}
                                    {tab.id === 'an' && (
                                        <div className="flex items-center gap-2">
                                            <BarChart2 size={14} /> {tab.label}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="relative animate-in duration-500 fade-in slide-in-from-bottom-4">
                            <div className="rounded-2xl border border-white/10 bg-[#161616] p-8 shadow-2xl">
                                {activeTab === 'ov' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                                            {[
                                                {
                                                    label: 'Total Books',
                                                    val: '12,480',
                                                    sub: '↑ 142 this month',
                                                },
                                                {
                                                    label: 'Active Borrows',
                                                    val: '384',
                                                    sub: '↑ 18 today',
                                                },
                                                {
                                                    label: 'Members',
                                                    val: '2,941',
                                                    sub: '↑ 29 this week',
                                                },
                                                {
                                                    label: 'Fines Collected',
                                                    val: '$1,240',
                                                    sub: '↑ 8% vs last month',
                                                },
                                            ].map((s) => (
                                                <div
                                                    key={s.label}
                                                    className="rounded-2xl border border-white/5 bg-white/5 p-6"
                                                >
                                                    <div className="mb-3 text-[10px] tracking-widest text-white/30 uppercase">
                                                        {s.label}
                                                    </div>
                                                    <div className="mb-2 text-3xl font-bold text-white">
                                                        {s.val}
                                                    </div>
                                                    <div className="text-xs font-semibold text-[#BAED91]">
                                                        {s.sub}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                            <div className="rounded-2xl border border-white/5 bg-white/5 p-8 lg:col-span-2">
                                                <div className="mb-8 text-[10px] tracking-widest text-white/30 uppercase">
                                                    Borrowing activity — last 30
                                                    days
                                                </div>
                                                <div className="flex h-32 items-end gap-1.5">
                                                    {[
                                                        40, 60, 45, 78, 52, 68,
                                                        48, 90, 62, 72, 44, 84,
                                                        63, 78, 100,
                                                    ].map((h, i) => (
                                                        <div
                                                            key={i}
                                                            style={{
                                                                height: `${h}%`,
                                                            }}
                                                            className={`flex-1 rounded-t-sm transition-all duration-500 ${h > 75 ? 'bg-[#BAED91]' : 'bg-[#BAED91]/20'}`}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                                                <div className="p-6 pb-2 text-[10px] tracking-widest text-white/30 uppercase">
                                                    Recent activity
                                                </div>
                                                <div className="divide-y divide-white/5">
                                                    {[
                                                        {
                                                            event: 'Borrowed',
                                                            member: 'J. Santos',
                                                            time: '2m ago',
                                                        },
                                                        {
                                                            event: 'Returned',
                                                            member: 'L. Reyes',
                                                            time: '14m ago',
                                                        },
                                                        {
                                                            event: 'Fine paid',
                                                            member: 'M. Cruz',
                                                            time: '1h ago',
                                                        },
                                                        {
                                                            event: 'Reservation',
                                                            member: 'A. Lim',
                                                            time: '2h ago',
                                                        },
                                                        {
                                                            event: 'New member',
                                                            member: 'T. Garcia',
                                                            time: '3h ago',
                                                        },
                                                    ].map((act, i) => (
                                                        <div
                                                            key={i}
                                                            className="group flex items-center justify-between px-6 py-2 transition-colors hover:bg-white/5"
                                                        >
                                                            <div>
                                                                <div className="text-[13px] text-white/80 transition-colors group-hover:text-white">
                                                                    {act.event}
                                                                </div>
                                                                <div className="mt-0.5 text-[11px] text-white/30">
                                                                    {act.member}
                                                                </div>
                                                            </div>
                                                            <span className="text-[11px] text-white/20">
                                                                {act.time}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'bk' && (
                                    <div>
                                        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
                                            <h3 className="text-xl font-bold text-white">
                                                Book Catalog
                                            </h3>
                                            <div className="flex gap-3">
                                                <div className="relative">
                                                    <Search
                                                        className="absolute top-1/2 left-3 -translate-y-1/2 text-white/30"
                                                        size={14}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Search catalog..."
                                                        className="w-64 rounded-lg border border-white/10 bg-white/5 py-2 pr-4 pl-9 text-sm text-white transition-all focus:border-[#BAED91]/50 focus:outline-none"
                                                    />
                                                </div>
                                                <button className="flex items-center gap-2 rounded-lg bg-[#BAED91] px-4 py-2 text-sm font-bold text-[#2D5012]">
                                                    <Plus size={16} /> Add Book
                                                </button>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                                            <table className="w-full text-left text-sm">
                                                <thead className="border-b border-white/10 text-white/30">
                                                    <tr>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Title & Author
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Category
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Copies
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Available
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {[
                                                        {
                                                            title: 'Deep Work',
                                                            author: 'Cal Newport',
                                                            cat: 'Productivity',
                                                            total: 8,
                                                            avail: 5,
                                                            status: 'Active',
                                                        },
                                                        {
                                                            title: 'Atomic Habits',
                                                            author: 'James Clear',
                                                            cat: 'Self-Help',
                                                            total: 12,
                                                            avail: 0,
                                                            status: 'All Out',
                                                        },
                                                        {
                                                            title: 'The Lean Startup',
                                                            author: 'Eric Ries',
                                                            cat: 'Business',
                                                            total: 6,
                                                            avail: 3,
                                                            status: 'Active',
                                                        },
                                                        {
                                                            title: 'Sapiens',
                                                            author: 'Yuval Noah Harari',
                                                            cat: 'History',
                                                            total: 10,
                                                            avail: 8,
                                                            status: 'Active',
                                                        },
                                                    ].map((book, i) => (
                                                        <tr
                                                            key={i}
                                                            className="transition-colors hover:bg-white/5"
                                                        >
                                                            <td className="px-6 py-5">
                                                                <div className="font-bold text-white/90">
                                                                    {book.title}
                                                                </div>
                                                                <div className="mt-0.5 text-xs text-white/30">
                                                                    {
                                                                        book.author
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5 text-white/50">
                                                                {book.cat}
                                                            </td>
                                                            <td className="px-6 py-5 text-white/50">
                                                                {book.total}
                                                            </td>
                                                            <td
                                                                className={`px-6 py-5 font-semibold ${book.avail === 0 ? 'text-red-400' : 'text-[#BAED91]'}`}
                                                            >
                                                                {book.avail}
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${book.avail >
                                                                            0
                                                                            ? 'bg-[#BAED91]/10 text-[#BAED91]'
                                                                            : 'bg-red-500/10 text-red-400'
                                                                        }`}
                                                                >
                                                                    {
                                                                        book.status
                                                                    }
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'mb' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                                            {[
                                                {
                                                    label: 'Total Members',
                                                    val: '2,941',
                                                },
                                                {
                                                    label: 'Active Borrowers',
                                                    val: '384',
                                                },
                                                {
                                                    label: 'With Overdue',
                                                    val: '47',
                                                    alert: true,
                                                },
                                                {
                                                    label: 'Fines Pending',
                                                    val: '$520',
                                                    warn: true,
                                                },
                                            ].map((s) => (
                                                <div
                                                    key={s.label}
                                                    className="rounded-2xl border border-white/5 bg-white/5 p-6"
                                                >
                                                    <div className="mb-3 text-[10px] tracking-widest text-white/30 uppercase">
                                                        {s.label}
                                                    </div>
                                                    <div
                                                        className={`text-3xl font-bold ${s.alert ? 'text-red-400' : s.warn ? 'text-amber-400' : 'text-white'}`}
                                                    >
                                                        {s.val}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                                            <table className="w-full text-left text-sm">
                                                <thead className="border-b border-white/10 text-white/30">
                                                    <tr>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Member
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Books Out
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Fines
                                                        </th>
                                                        <th className="px-6 py-4 text-[10px] font-semibold tracking-widest uppercase">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {[
                                                        {
                                                            name: 'Juan Santos',
                                                            since: 'Jan 2024',
                                                            out: 3,
                                                            fines: '$0.00',
                                                            status: 'Good',
                                                        },
                                                        {
                                                            name: 'Lucia Reyes',
                                                            since: 'Mar 2023',
                                                            out: 1,
                                                            fines: '$4.50',
                                                            status: 'Overdue',
                                                        },
                                                        {
                                                            name: 'Marco Cruz',
                                                            since: 'Sep 2024',
                                                            out: 0,
                                                            fines: '$0.00',
                                                            status: 'Reserved',
                                                        },
                                                    ].map((m, i) => (
                                                        <tr
                                                            key={i}
                                                            className="transition-colors hover:bg-white/5"
                                                        >
                                                            <td className="px-6 py-5">
                                                                <div className="font-bold text-white/90">
                                                                    {m.name}
                                                                </div>
                                                                <div className="mt-0.5 text-xs text-white/30">
                                                                    Since{' '}
                                                                    {m.since}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5 text-white/50">
                                                                {m.out}
                                                            </td>
                                                            <td
                                                                className={`px-6 py-5 font-semibold ${m.fines !== '$0.00' ? 'text-red-400' : 'text-[#BAED91]'}`}
                                                            >
                                                                {m.fines}
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span
                                                                    className={`rounded-full px-3 py-1 text-[10px] font-bold ${m.status ===
                                                                            'Good'
                                                                            ? 'bg-[#BAED91]/10 text-[#BAED91]'
                                                                            : m.status ===
                                                                                'Overdue'
                                                                                ? 'bg-red-500/10 text-red-400'
                                                                                : 'bg-indigo-500/10 text-indigo-300'
                                                                        }`}
                                                                >
                                                                    {m.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'an' && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                                            {[
                                                {
                                                    label: 'Borrow Rate',
                                                    val: '↑ 23%',
                                                    sub: 'vs last month',
                                                },
                                                {
                                                    label: 'Avg Loan Days',
                                                    val: '8.4',
                                                    sub: 'per borrow',
                                                },
                                                {
                                                    label: 'Top Category',
                                                    val: 'Science',
                                                    sub: '32% of borrows',
                                                },
                                                {
                                                    label: 'Fine Recovery',
                                                    val: '94%',
                                                    sub: 'collection rate',
                                                },
                                            ].map((s) => (
                                                <div
                                                    key={s.label}
                                                    className="rounded-2xl border border-white/5 bg-white/5 p-6"
                                                >
                                                    <div className="mb-3 text-[10px] tracking-widest text-white/30 uppercase">
                                                        {s.label}
                                                    </div>
                                                    <div className="mb-1 text-2xl font-bold text-white">
                                                        {s.val}
                                                    </div>
                                                    <div className="text-xs text-white/20">
                                                        {s.sub}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                                                <div className="mb-8 text-[10px] tracking-widest text-white/30 uppercase">
                                                    Most borrowed
                                                </div>
                                                <div className="space-y-6">
                                                    {[
                                                        {
                                                            label: 'Atomic Habits',
                                                            pct: 85,
                                                        },
                                                        {
                                                            label: 'Deep Work',
                                                            pct: 72,
                                                        },
                                                        {
                                                            label: 'The Lean Startup',
                                                            pct: 57,
                                                        },
                                                        {
                                                            label: 'Sapiens',
                                                            pct: 44,
                                                        },
                                                    ].map((item) => (
                                                        <div
                                                            key={item.label}
                                                            className="space-y-2.5"
                                                        >
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span className="font-medium text-white/60">
                                                                    {item.label}
                                                                </span>
                                                                <span className="font-bold text-[#BAED91]">
                                                                    {item.pct}
                                                                </span>
                                                            </div>
                                                            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                                                                <div
                                                                    className="h-full rounded-full bg-[#BAED91] transition-all duration-1000"
                                                                    style={{
                                                                        width: `${item.pct}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
                                                <div className="mb-8 text-[10px] tracking-widest text-white/30 uppercase">
                                                    Borrows by category
                                                </div>
                                                <div className="space-y-4">
                                                    {[
                                                        {
                                                            label: 'Science',
                                                            pct: 32,
                                                            op: 1,
                                                        },
                                                        {
                                                            label: 'Self-Help',
                                                            pct: 24,
                                                            op: 0.65,
                                                        },
                                                        {
                                                            label: 'Business',
                                                            pct: 18,
                                                            op: 0.45,
                                                        },
                                                        {
                                                            label: 'Fiction',
                                                            pct: 14,
                                                            op: 0.25,
                                                        },
                                                        {
                                                            label: 'Other',
                                                            pct: 12,
                                                            op: 0.1,
                                                        },
                                                    ].map((item) => (
                                                        <div
                                                            key={item.label}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="h-2.5 w-2.5 rounded-sm bg-[#BAED91]"
                                                                    style={{
                                                                        opacity:
                                                                            item.op,
                                                                    }}
                                                                ></div>
                                                                <span className="text-sm text-white/50">
                                                                    {item.label}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-bold text-white/80">
                                                                {item.pct}%
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section id="workflow" className="bg-[#f8f8f6]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 text-center opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-[#767676] uppercase">
                            How it works
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                            Running in four steps
                        </h2>
                    </div>
                    <div className="relative mt-20">
                        <div className="absolute top-6 right-[10%] left-[10%] hidden h-px bg-linear-to-r from-[#BAED91] from-75% to-transparent to-90% lg:block"></div>
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                            {[
                                {
                                    n: 1,
                                    title: 'Add your books',
                                    desc: 'Import via CSV or add manually. Assign categories, authors, publishers, and barcodes.',
                                },
                                {
                                    n: 2,
                                    title: 'Register members',
                                    desc: 'Create member profiles with roles. Welcome emails go out automatically.',
                                },
                                {
                                    n: 3,
                                    title: 'Borrow with barcode',
                                    desc: 'Staff scan at checkout. Due dates and availability are handled automatically.',
                                },
                                {
                                    n: 4,
                                    title: 'Track everything',
                                    desc: 'Monitor fines, activity, and trends. Automation handles the rest.',
                                },
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className="animate-on-scroll relative z-10 translate-y-4 text-center opacity-0 transition-all duration-700"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#BAED91] bg-white text-sm font-bold text-[#2D5012] shadow-sm">
                                        {step.n}
                                    </div>
                                    <h4 className="mb-3 text-base font-bold">
                                        {step.title}
                                    </h4>
                                    <p className="mx-auto max-w-[200px] text-sm leading-relaxed text-[#767676]">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 text-center opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-[#767676] uppercase">
                            Pricing
                        </span>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
                            Simple, transparent pricing
                        </h2>
                        <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#767676]">
                            Start free. Scale when ready. No surprises.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                        {/* Free Tier */}
                        <div className="animate-on-scroll translate-y-4 rounded-3xl border border-black/[0.08] bg-white p-10 opacity-0 transition-all duration-700">
                            <div className="mb-6 text-[10px] font-bold tracking-widest text-[#767676] uppercase">
                                Free
                            </div>
                            <div className="mb-2 flex items-baseline gap-1">
                                <span className="text-xl font-bold">$</span>
                                <span className="text-5xl font-extrabold tracking-tight">
                                    0
                                </span>
                            </div>
                            <div className="mb-8 text-sm text-[#767676]">
                                Forever free
                            </div>
                            <p className="mb-8 text-sm leading-relaxed text-[#767676]">
                                For small community libraries or evaluating the
                                platform.
                            </p>
                            <div className="mb-8 h-px bg-black/[0.08]"></div>
                            <ul className="mb-10 space-y-4">
                                {[
                                    'Up to 500 books',
                                    'Up to 50 members',
                                    'Basic borrow & return',
                                    'Member dashboard',
                                    'Email support',
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-[#3a3a3a]"
                                    >
                                        <Check
                                            size={16}
                                            className="text-[#BAED91]"
                                            strokeWidth={3}
                                        />{' '}
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register"
                                className="block w-full rounded-xl border border-black/[0.08] py-3 text-center text-sm font-bold transition-all hover:border-black/20 hover:bg-[#f8f8f6]"
                            >
                                Get started
                            </Link>
                        </div>

                        {/* Pro Tier */}
                        <div className="animate-on-scroll relative translate-y-4 rounded-3xl border-2 border-[#BAED91] bg-[#f7fcf2] p-10 opacity-0 transition-all duration-700">
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#BAED91] px-4 py-1 text-[10px] font-bold tracking-widest text-[#2D5012] uppercase">
                                Most popular
                            </div>
                            <div className="mb-6 text-[10px] font-bold tracking-widest text-[#767676] uppercase">
                                Pro
                            </div>
                            <div className="mb-2 flex items-baseline gap-1">
                                <span className="text-xl font-bold">$</span>
                                <span className="text-5xl font-extrabold tracking-tight text-[#0d0d0d]">
                                    29
                                </span>
                            </div>
                            <div className="mb-8 text-sm text-[#767676]">
                                per month, billed annually
                            </div>
                            <p className="mb-8 text-sm leading-relaxed text-[#767676]">
                                The full toolkit for growing libraries that need
                                automation.
                            </p>
                            <div className="mb-8 h-px bg-[#BAED91]/30"></div>
                            <ul className="mb-10 space-y-4">
                                {[
                                    'Unlimited books & members',
                                    'Barcode scanning',
                                    'Automatic fine calculation',
                                    'Reservation queue',
                                    'Analytics & reports',
                                    'Audit logs',
                                    'Priority support',
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-[#3a3a3a]"
                                    >
                                        <Check
                                            size={16}
                                            className="text-[#2D5012]"
                                            strokeWidth={3}
                                        />{' '}
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/register"
                                className="block w-full rounded-xl bg-[#BAED91] py-3 text-center text-sm font-bold text-[#2D5012] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#9BD26E] active:translate-y-0"
                            >
                                Start Pro trial
                            </Link>
                        </div>

                        {/* Enterprise Tier */}
                        <div className="animate-on-scroll translate-y-4 rounded-3xl border border-black/[0.08] bg-white p-10 opacity-0 transition-all duration-700">
                            <div className="mb-6 text-[10px] font-bold tracking-widest text-[#767676] uppercase">
                                Enterprise
                            </div>
                            <div className="mb-2 text-4xl font-extrabold tracking-tight">
                                Custom
                            </div>
                            <div className="invisible mb-8 text-sm text-[#767676]">
                                Placeholder
                            </div>
                            <p className="mb-8 text-sm leading-relaxed text-[#767676]">
                                For multi-branch institutions with advanced
                                needs and dedicated support.
                            </p>
                            <div className="mb-8 h-px bg-black/[0.08]"></div>
                            <ul className="mb-10 space-y-4">
                                {[
                                    'Everything in Pro',
                                    'Multi-branch management',
                                    'Custom roles & permissions',
                                    'SSO / SAML integration',
                                    'Dedicated account manager',
                                    'On-premise option',
                                ].map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-[#3a3a3a]"
                                    >
                                        <Check
                                            size={16}
                                            className="text-[#BAED91]"
                                            strokeWidth={3}
                                        />{' '}
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full cursor-pointer rounded-xl border border-black/[0.08] py-3 text-sm font-bold transition-all hover:border-black/20 hover:bg-[#f8f8f6]">
                                Contact sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="bg-[#f8f8f6]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="animate-on-scroll translate-y-4 text-center opacity-0 transition-all duration-700">
                        <span className="mb-4 block text-[11px] font-bold tracking-[0.2em] text-[#767676] uppercase">
                            FAQ
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                            Common questions
                        </h2>
                    </div>

                    <div className="animate-on-scroll mx-auto mt-16 max-w-3xl translate-y-4 space-y-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.08] opacity-0 transition-all duration-700">
                        {[
                            {
                                q: 'Is Shelfcentral suitable for schools and universities?',
                                a: 'Absolutely. Shelfcentral is purpose-built for educational institutions. Schools and universities can manage unlimited students as members, set role-based access for librarians and administrators, and use the analytics dashboard to track reading engagement across departments.',
                            },
                            {
                                q: 'Does it support barcode systems?',
                                a: 'Yes. Each book copy gets a unique barcode. Staff can use any standard USB scanner to check out or return books instantly. Labels can be printed directly from the platform.',
                            },
                            {
                                q: 'Can each library manage its own data independently?',
                                a: 'Yes. Shelfcentral uses a multi-tenant architecture where each library has a completely isolated data environment. Your members, books, and logs are never accessible to other institutions on the platform.',
                            },
                            {
                                q: 'Is there a self-service member dashboard?',
                                a: 'Yes. Members get their own login to view borrowings and due dates, check fine balances, manage reservations, and browse the catalog — all without staff involvement.',
                            },
                            {
                                q: 'Can fines be automated?',
                                a: 'Yes. You define fine policies — daily rates per category, grace periods, and caps — and Shelfcentral enforces them automatically. Fines accrue the moment a loan goes overdue, visible to staff and the borrower in real time.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white">
                                <button
                                    className="group flex w-full cursor-pointer items-center justify-between p-7 text-left transition-colors hover:bg-[#f8f8f6]"
                                    onClick={() => toggleFaq(i)}
                                >
                                    <span className="text-[15px] font-bold text-[#0d0d0d] transition-colors group-hover:text-[#2D5012]">
                                        {item.q}
                                    </span>
                                    <ChevronDown
                                        size={20}
                                        className={`text-[#767676] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i
                                            ? 'max-h-64 opacity-100'
                                            : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="px-7 pb-8">
                                        <p className="text-[14px] leading-relaxed text-[#767676]">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                id="cta"
                className="relative overflow-hidden bg-[#0d0d0d] py-32"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#BAED91_0%,transparent_70%)] opacity-20"></div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <div className="animate-on-scroll mx-auto max-w-2xl translate-y-4 opacity-0 transition-all duration-700">
                        <h2 className="mb-8 text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-6xl">
                            Start modernizing your library{' '}
                            <span className="font-['Instrument_Serif'] font-normal text-[#BAED91] italic">
                                today
                            </span>
                        </h2>
                        <p className="mb-12 text-xl leading-relaxed text-white/40">
                            Join forward-thinking institutions already on
                            Shelfcentral. Free to start, easy to scale.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/register"
                                className="rounded-xl bg-[#BAED91] px-10 py-4 text-lg font-bold text-[#2D5012] shadow-xl shadow-[#BAED91]/10 transition-all hover:-translate-y-0.5 hover:bg-[#9BD26E] active:translate-y-0"
                            >
                                Start Free →
                            </Link>
                            <button className="rounded-xl border border-white/10 px-10 py-4 text-lg font-semibold text-white/60 transition-all hover:border-white/20 hover:bg-white/5 hover:text-white">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#0d0d0d] pt-20 pb-10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
                        <div className="col-span-2">
                            <Link
                                href="/"
                                className="mb-6 flex items-center gap-2.5 text-lg font-bold tracking-tight text-white"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#BAED91]">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <rect
                                            x="1"
                                            y="2"
                                            width="12"
                                            height="2"
                                            rx=".8"
                                            fill="#0d0d0d"
                                        />
                                        <rect
                                            x="1"
                                            y="6"
                                            width="9"
                                            height="2"
                                            rx=".8"
                                            fill="#0d0d0d"
                                            className="opacity-70"
                                        />
                                        <rect
                                            x="1"
                                            y="10"
                                            width="10"
                                            height="2"
                                            rx=".8"
                                            fill="#0d0d0d"
                                            className="opacity-50"
                                        />
                                    </svg>
                                </div>
                                <span>Shelfcentral</span>
                            </Link>
                            <p className="max-w-xs text-sm leading-relaxed text-white/30">
                                Modern library management for schools,
                                universities, and community institutions.
                            </p>
                        </div>

                        <div>
                            <h5 className="mb-6 text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
                                Product
                            </h5>
                            <ul className="space-y-4">
                                {[
                                    'Features',
                                    'Pricing',
                                    'Dashboard',
                                    'Changelog',
                                ].map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-white/40 transition-colors hover:text-white"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="mb-6 text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
                                Resources
                            </h5>
                            <ul className="space-y-4">
                                {[
                                    'Documentation',
                                    'API Reference',
                                    'GitHub',
                                    'Status',
                                ].map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-white/40 transition-colors hover:text-white"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="mb-6 text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
                                Company
                            </h5>
                            <ul className="space-y-4">
                                {['About', 'Contact', 'Privacy', 'Terms'].map(
                                    (link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-white/40 transition-colors hover:text-white"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
                        <p className="text-xs text-white/20">
                            © {year} Shelfcentral. All rights reserved.
                        </p>
                        <p className="text-xs text-white/10 italic">
                            Built for institutions that care about knowledge.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Global CSS for custom animations */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
        @keyframes float {
          0%, 100% { transform: perspective(1100px) rotateX(2.5deg) translateY(0); }
          50% { transform: perspective(1100px) rotateX(2.5deg) translateY(-10px); }
        }
        @keyframes float-side {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float-side 4s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .animate-float-delay-2 {
          animation: float-side 4s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html {
          scroll-behavior: smooth;
        }
      `,
                }}
            />
        </div>
    );
}
