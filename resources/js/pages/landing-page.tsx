import { Head, Link } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Grid,
  ShieldCheck,
  Clock,
  Check,
  ArrowRight,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
  Users,
  RefreshCcw,
  Bookmark,
  DollarSign,
  BarChart2,
  ClipboardList,
  Star,
  Heart
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('ov');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const year = new Date().getFullYear();

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
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

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
        className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-black/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
              <div className="w-8 h-8 bg-[#BAED91] rounded-lg flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="2" rx=".8" fill="#0d0d0d"/>
                  <rect x="1" y="6" width="9" height="2" rx=".8" fill="#0d0d0d" className="opacity-70"/>
                  <rect x="1" y="10" width="10" height="2" rx=".8" fill="#0d0d0d" className="opacity-50"/>
                </svg>
              </div>
              <span className={`${isScrolled ? 'text-black' : 'text-white'}`}>Shelfcentral</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
                {['Features', 'Pricing', 'FAQ', 'Docs'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${isScrolled ? 'text-ink hover:text-white hover:bg-ink!' : 'text-ink-3 hover:text-ink hover:bg-surface'}`}
                    >
                        {item}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`default-btn ${isScrolled ? 'text-ink border-ink-3! hover:text-white hover:border-transparent hover:bg-ink!' : 'text-ink-4 border-ink-3! hover:text-black hover:border-transparent'}`}
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="primary-btn"
              >
                Start Free
              </Link>
              <button
                className="md:hidden p-2 text-[#0d0d0d]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 top-16 bg-[#111] z-[98] md:hidden transition-all duration-300 origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-2">
          {['Features', 'Pricing', 'FAQ', 'Docs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="py-4 text-lg font-medium text-white/60 border-b border-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            href="/register"
            className="mt-6 bg-[#BAED91] text-[#2D5012] py-4 rounded-xl text-center font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Start Free
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#0d0d0d] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(186,237,145,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(186,237,145,.04)_1px,transparent_1px)] bg-[length:48px_48px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BAED91]/10 border border-[#BAED91]/20 text-[#BAED91] text-xs font-semibold mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BAED91] animate-pulse"></span>
              Barcode scanning & auto-fines included
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              Library management,<br />
              <em className="font-instrument-serif italic font-normal text-[#BAED91]">finally modernized</em>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
              Catalog, borrow, track, and analyze — everything your library needs in one clean, centralized platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/register" className="bg-[#BAED91] text-[#2D5012] px-8 py-3.5 rounded-xl text-base font-bold hover:bg-[#9BD26E] hover:-translate-y-0.5 transition-all shadow-xl active:translate-y-0">
                Start Free →
              </Link>
              <a href="#showcase" className="px-8 py-3.5 rounded-xl text-base font-semibold text-white/60 border border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all">
                View demo
              </a>
            </div>
          </div>

          {/* Mockup */}
          <div className="mt-20 relative max-w-5xl mx-auto animate-float">
            {/* Floating Stats */}
            <div className="absolute -left-4 top-10 z-20 hidden lg:block bg-[#121212]/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-float-delay-1">
              <div className="text-xl mb-1">📚</div>
              <div className="text-2xl font-bold text-white">12,480</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Books catalogued</div>
            </div>
            <div className="absolute -right-4 top-24 z-20 hidden lg:block bg-[#121212]/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-float-delay-2">
              <div className="text-xl mb-1 text-[#BAED91]">⚡</div>
              <div className="text-2xl font-bold text-white">98.6%</div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">On-time returns</div>
            </div>

            <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] transform perspective-[1100px] rotate-x-[2.5deg]">
              <div className="bg-[#111] px-5 py-3.5 flex items-center gap-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                </div>
                <div className="flex-1 bg-white/5 rounded-md py-1 px-4 text-[10px] font-mono text-white/30 text-center">
                  app.shelfcentral.io/dashboard
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[420px]">
                <aside className="hidden md:block bg-white/[0.02] border-r border-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-white mb-6">
                    <div className="w-5 h-5 bg-[#BAED91] rounded-md shrink-0"></div>
                    Shelfcentral
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 px-3 py-2 bg-[#BAED91]/10 text-[#BAED91] rounded-lg text-[11px] font-semibold">
                      <LayoutDashboard size={14} /> Overview
                    </div>
                    {['Books', 'Members', 'Borrowings', 'Reservations', 'Fines', 'Analytics'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 px-3 py-2 text-white/30 text-[11px] hover:text-white/50 transition-colors cursor-pointer">
                        <div className="w-3.5 h-3.5 opacity-60">
                           {item === 'Books' && <BookOpen size={14} />}
                           {item === 'Members' && <Users size={14} />}
                           {item === 'Borrowings' && <RefreshCcw size={14} />}
                           {item === 'Reservations' && <Bookmark size={14} />}
                           {item === 'Fines' && <DollarSign size={14} />}
                           {item === 'Analytics' && <BarChart2 size={14} />}
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>
                <main className="p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Library Overview</h3>
                    <span className="text-[10px] text-white/30">May 2025</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: 'Books', val: '12,480', sub: '+142 this month' },
                      { label: 'Active Borrows', val: '384', sub: '+18 today' },
                      { label: 'Members', val: '2,941', sub: '+29 this week' },
                      { label: 'Overdue', val: '47', sub: '↑ 3 since yesterday', alert: true },
                    ].map((card) => (
                      <div key={card.label} className="bg-white/[0.04] border border-white/5 p-3.5 rounded-xl">
                        <div className="text-[9px] uppercase tracking-widest text-white/30 mb-2">{card.label}</div>
                        <div className={`text-xl font-bold ${card.alert ? 'text-[#f87171]' : 'text-white'}`}>{card.val}</div>
                        <div className={`text-[9px] mt-1.5 ${card.alert ? 'text-[#f87171]' : 'text-[#BAED91]'}`}>{card.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/[0.04] border border-white/5 p-4 rounded-xl">
                    <div className="text-[9px] uppercase tracking-widest text-white/30 mb-4">Borrowing activity — last 14 days</div>
                    <div className="flex items-end gap-1 h-16">
                      {[38, 55, 33, 72, 48, 62, 44, 88, 55, 70, 45, 82, 60, 100].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-t-[2px] ${h > 70 ? 'bg-[#BAED91]' : 'bg-[#BAED91]/20'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/[0.04] border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="border-b border-white/5 text-white/30">
                        <tr>
                          <th className="px-4 py-2.5 font-medium uppercase tracking-widest text-[9px]">Book</th>
                          <th className="px-4 py-2.5 font-medium uppercase tracking-widest text-[9px]">Borrower</th>
                          <th className="px-4 py-2.5 font-medium uppercase tracking-widest text-[9px]">Due</th>
                          <th className="px-4 py-2.5 font-medium uppercase tracking-widest text-[9px]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/50">
                        {[
                          { title: 'Deep Work', name: 'J. Santos', date: 'May 14', status: 'Active', type: 'ok' },
                          { title: 'Atomic Habits', name: 'L. Reyes', date: 'Apr 30', status: 'Overdue', type: 'ov' },
                          { title: 'The Lean Startup', name: 'M. Cruz', date: 'May 20', status: 'Reserved', type: 'rs' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-white/[0.03] last:border-0">
                            <td className="px-4 py-3 font-medium text-white/80">{row.title}</td>
                            <td className="px-4 py-3">{row.name}</td>
                            <td className="px-4 py-3">{row.date}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                                row.type === 'ok' ? 'bg-[#BAED91]/10 text-[#BAED91]' :
                                row.type === 'ov' ? 'bg-red-500/10 text-red-400' :
                                'bg-indigo-500/10 text-indigo-300'
                              }`}>
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
      <section id="trust" className="bg-[#0d0d0d] border-t border-white/10 pb-0 pt-15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden -mt-8 relative z-20 shadow-2xl">
            {[
              { icon: <ShieldCheck size={18} />, title: 'Multi-tenant', desc: 'Isolated data per institution.' },
              { icon: <Grid size={18} />, title: 'Barcode-ready', desc: 'Works with standard scanners.' },
              { icon: <ClipboardList size={18} />, title: 'Audit logging', desc: 'Every action, fully traceable.' },
              { icon: <Clock size={18} />, title: 'Built for institutions', desc: 'Schools, universities, libraries.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0d0d0d] p-7 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#BAED91]/10 flex items-center justify-center shrink-0 text-[#BAED91]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-4 block">The problem</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Traditional libraries run on friction</h2>
            <p className="text-lg text-[#767676] max-w-xl leading-relaxed">
              Manual processes, lost records, and uncollected fines are symptoms of a system that hasn't caught up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white border border-black/[0.08] rounded-2xl p-8 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-lg">⚠️</div>
                <span className="font-bold text-sm">The old way</span>
              </div>
              <ul className="space-y-4">
                {[
                  'Manual tracking on paper creates lost records and unresolved disputes over returns.',
                  'Fines are calculated by hand — slow, error-prone, and easy to miss.',
                  'No single source of truth; staff juggle spreadsheets, notebooks, and email.',
                  'Members have no self-service access — every request requires staff time.'
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✕</div>
                    <p className="text-[14px] text-[#3a3a3a] leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#BAED91]/40 rounded-2xl p-8 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#BAED91]/15 flex items-center justify-center text-lg">✅</div>
                <span className="font-bold text-sm">The Shelfcentral way</span>
              </div>
              <ul className="space-y-4">
                {[
                  'Centralized digital catalog with real-time borrowing status and complete history.',
                  'Automatic fine calculation — policies enforce themselves, zero human error.',
                  'One platform for catalog, members, reservations, analytics, and more.',
                  'Member portal for browsing, reserving, and tracking without staff assistance.'
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#BAED91]/30 text-[#2D5012] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">✓</div>
                    <p className="text-[14px] text-[#3a3a3a] leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-4 block">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Everything your library needs</h2>
            <p className="text-lg text-[#767676] max-w-xl mx-auto leading-relaxed">
              A complete toolkit — nothing extraneous, nothing missing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.08] border border-black/[0.08] rounded-3xl overflow-hidden mt-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            {[
              { icon: '📚', title: 'Catalog Management', desc: 'Organize books by author, category, publisher, and ISBN. Fast search, bulk import via CSV.' },
              { icon: '🔄', title: 'Borrow & Return', desc: 'Issue and return books in seconds. Real-time copy-level availability, full borrower history.' },
              { icon: '💰', title: 'Automatic Fines', desc: 'Define policies per category. Fines accrue automatically on overdue items — no manual work.' },
              { icon: '🔳', title: 'Barcode Tracking', desc: 'Every copy gets a unique barcode. Scan to issue or return with any standard USB scanner.' },
              { icon: '🔐', title: 'Role-based Access', desc: 'Admin, Librarian, and Member roles with fine-grained permissions per section.' },
              { icon: '📋', title: 'Reservation Queue', desc: 'Members reserve books on loan. Auto-notifications when a copy becomes available.' },
              { icon: '👤', title: 'Member Dashboard', desc: 'Self-service portal: browse catalog, track borrowings, view fines, manage reservations.' },
              { icon: '⭐', title: 'Reviews & Favorites', desc: 'Members rate and save books. Drives engagement and surfaces popular titles.' },
              { icon: '🗒️', title: 'Audit Logs', desc: 'A tamper-evident record of every system action. Full accountability for admins.' },
            ].map((feat, i) => (
              <div key={i} className="bg-white p-10 hover:bg-[#f8f8f6] transition-colors group">
                <div className="text-3xl mb-6">{feat.icon}</div>
                <h4 className="text-base font-bold mb-3 group-hover:text-[#2D5012] transition-colors">{feat.title}</h4>
                <p className="text-sm text-[#767676] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
            <div className="bg-white p-10 lg:col-span-3 flex flex-col md:flex-row md:items-center gap-8 hover:bg-[#f8f8f6] transition-colors group">
              <div className="text-4xl">📈</div>
              <div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-[#2D5012] transition-colors">Analytics & Reports</h4>
                <p className="text-[14px] text-[#767676] leading-relaxed">Borrowing trends, popular titles, member activity, fine collection rates. Export to PDF or CSV.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/30 mb-4 block">Dashboard preview</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Your library, at a glance</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
              Designed for daily use — fast, clear, and always up to date.
            </p>
          </div>

          <div className="mt-16">
            <div className="flex bg-white/5 p-1 rounded-xl w-fit mx-auto mb-12 border border-white/5">
              {[
                { id: 'ov', label: 'Overview' },
                { id: 'bk', label: 'Books' },
                { id: 'mb', label: 'Members' },
                { id: 'an', label: 'Analytics' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#BAED91] text-[#2D5012] shadow-lg'
                      : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {tab.id === 'ov' && <div className="flex items-center gap-2"><LayoutDashboard size={14} /> {tab.label}</div>}
                  {tab.id === 'bk' && <div className="flex items-center gap-2"><BookOpen size={14} /> {tab.label}</div>}
                  {tab.id === 'mb' && <div className="flex items-center gap-2"><Users size={14} /> {tab.label}</div>}
                  {tab.id === 'an' && <div className="flex items-center gap-2"><BarChart2 size={14} /> {tab.label}</div>}
                </button>
              ))}
            </div>

            <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#161616] border border-white/10 rounded-2xl p-8 shadow-2xl">
                {activeTab === 'ov' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Total Books', val: '12,480', sub: '↑ 142 this month' },
                        { label: 'Active Borrows', val: '384', sub: '↑ 18 today' },
                        { label: 'Members', val: '2,941', sub: '↑ 29 this week' },
                        { label: 'Fines Collected', val: '$1,240', sub: '↑ 8% vs last month' },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">{s.label}</div>
                          <div className="text-3xl font-bold text-white mb-2">{s.val}</div>
                          <div className="text-xs text-[#BAED91] font-semibold">{s.sub}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-white/5 border border-white/5 p-8 rounded-2xl">
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-8">Borrowing activity — last 30 days</div>
                        <div className="flex items-end gap-1.5 h-32">
                          {[40, 60, 45, 78, 52, 68, 48, 90, 62, 72, 44, 84, 63, 78, 100].map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${h}%` }}
                              className={`flex-1 rounded-t-sm transition-all duration-500 ${h > 75 ? 'bg-[#BAED91]' : 'bg-[#BAED91]/20'}`}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 pb-2 text-[10px] uppercase tracking-widest text-white/30">Recent activity</div>
                        <div className="divide-y divide-white/5">
                          {[
                            { event: 'Borrowed', member: 'J. Santos', time: '2m ago' },
                            { event: 'Returned', member: 'L. Reyes', time: '14m ago' },
                            { event: 'Fine paid', member: 'M. Cruz', time: '1h ago' },
                            { event: 'Reservation', member: 'A. Lim', time: '2h ago' },
                            { event: 'New member', member: 'T. Garcia', time: '3h ago' },
                          ].map((act, i) => (
                            <div key={i} className="px-6 py-2 flex items-center justify-between group hover:bg-white/5 transition-colors">
                              <div>
                                <div className="text-[13px] text-white/80 group-hover:text-white transition-colors">{act.event}</div>
                                <div className="text-[11px] text-white/30 mt-0.5">{act.member}</div>
                              </div>
                              <span className="text-[11px] text-white/20">{act.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'bk' && (
                  <div>
                    <div className="flex md:items-center justify-between mb-8 flex-col md:flex-row gap-4 md:gap-0">
                      <h3 className="text-xl font-bold text-white">Book Catalog</h3>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                          <input
                            type="text"
                            placeholder="Search catalog..."
                            className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#BAED91]/50 transition-all w-64"
                          />
                        </div>
                        <button className="bg-[#BAED91] text-[#2D5012] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                          <Plus size={16} /> Add Book
                        </button>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-white/30">
                          <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Title & Author</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Category</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Copies</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Available</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { title: 'Deep Work', author: 'Cal Newport', cat: 'Productivity', total: 8, avail: 5, status: 'Active' },
                            { title: 'Atomic Habits', author: 'James Clear', cat: 'Self-Help', total: 12, avail: 0, status: 'All Out' },
                            { title: 'The Lean Startup', author: 'Eric Ries', cat: 'Business', total: 6, avail: 3, status: 'Active' },
                            { title: 'Sapiens', author: 'Yuval Noah Harari', cat: 'History', total: 10, avail: 8, status: 'Active' },
                          ].map((book, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-5">
                                <div className="font-bold text-white/90">{book.title}</div>
                                <div className="text-xs text-white/30 mt-0.5">{book.author}</div>
                              </td>
                              <td className="px-6 py-5 text-white/50">{book.cat}</td>
                              <td className="px-6 py-5 text-white/50">{book.total}</td>
                              <td className={`px-6 py-5 font-semibold ${book.avail === 0 ? 'text-red-400' : 'text-[#BAED91]'}`}>
                                {book.avail}
                              </td>
                              <td className="px-6 py-5">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                  book.avail > 0 ? 'bg-[#BAED91]/10 text-[#BAED91]' : 'bg-red-500/10 text-red-400'
                                }`}>
                                  {book.status}
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Total Members', val: '2,941' },
                        { label: 'Active Borrowers', val: '384' },
                        { label: 'With Overdue', val: '47', alert: true },
                        { label: 'Fines Pending', val: '$520', warn: true },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">{s.label}</div>
                          <div className={`text-3xl font-bold ${s.alert ? 'text-red-400' : s.warn ? 'text-amber-400' : 'text-white'}`}>{s.val}</div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-white/30">
                          <tr>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Member</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Books Out</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Fines</th>
                            <th className="px-6 py-4 font-semibold uppercase tracking-widest text-[10px]">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { name: 'Juan Santos', since: 'Jan 2024', out: 3, fines: '$0.00', status: 'Good' },
                            { name: 'Lucia Reyes', since: 'Mar 2023', out: 1, fines: '$4.50', status: 'Overdue' },
                            { name: 'Marco Cruz', since: 'Sep 2024', out: 0, fines: '$0.00', status: 'Reserved' },
                          ].map((m, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="px-6 py-5">
                                <div className="font-bold text-white/90">{m.name}</div>
                                <div className="text-xs text-white/30 mt-0.5">Since {m.since}</div>
                              </td>
                              <td className="px-6 py-5 text-white/50">{m.out}</td>
                              <td className={`px-6 py-5 font-semibold ${m.fines !== '$0.00' ? 'text-red-400' : 'text-[#BAED91]'}`}>
                                {m.fines}
                              </td>
                              <td className="px-6 py-5">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                                  m.status === 'Good' ? 'bg-[#BAED91]/10 text-[#BAED91]' :
                                  m.status === 'Overdue' ? 'bg-red-500/10 text-red-400' :
                                  'bg-indigo-500/10 text-indigo-300'
                                }`}>
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { label: 'Borrow Rate', val: '↑ 23%', sub: 'vs last month' },
                        { label: 'Avg Loan Days', val: '8.4', sub: 'per borrow' },
                        { label: 'Top Category', val: 'Science', sub: '32% of borrows' },
                        { label: 'Fine Recovery', val: '94%', sub: 'collection rate' },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">{s.label}</div>
                          <div className="text-2xl font-bold text-white mb-1">{s.val}</div>
                          <div className="text-xs text-white/20">{s.sub}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-8">Most borrowed</div>
                        <div className="space-y-6">
                          {[
                            { label: 'Atomic Habits', pct: 85 },
                            { label: 'Deep Work', pct: 72 },
                            { label: 'The Lean Startup', pct: 57 },
                            { label: 'Sapiens', pct: 44 },
                          ].map((item) => (
                            <div key={item.label} className="space-y-2.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60 font-medium">{item.label}</span>
                                <span className="text-[#BAED91] font-bold">{item.pct}</span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#BAED91] rounded-full transition-all duration-1000"
                                  style={{ width: `${item.pct}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 border border-white/5 p-8 rounded-2xl">
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mb-8">Borrows by category</div>
                        <div className="space-y-4">
                          {[
                            { label: 'Science', pct: 32, op: 1 },
                            { label: 'Self-Help', pct: 24, op: 0.65 },
                            { label: 'Business', pct: 18, op: 0.45 },
                            { label: 'Fiction', pct: 14, op: 0.25 },
                            { label: 'Other', pct: 12, op: 0.1 },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-sm bg-[#BAED91]" style={{ opacity: item.op }}></div>
                                <span className="text-sm text-white/50">{item.label}</span>
                              </div>
                              <span className="text-sm font-bold text-white/80">{item.pct}%</span>
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
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-4 block">How it works</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Running in four steps</h2>
          </div>
          <div className="mt-20 relative">
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-linear-to-r from-[#BAED91] from-75% to-transparent to-90%"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {[
                { n: 1, title: 'Add your books', desc: 'Import via CSV or add manually. Assign categories, authors, publishers, and barcodes.' },
                { n: 2, title: 'Register members', desc: 'Create member profiles with roles. Welcome emails go out automatically.' },
                { n: 3, title: 'Borrow with barcode', desc: 'Staff scan at checkout. Due dates and availability are handled automatically.' },
                { n: 4, title: 'Track everything', desc: 'Monitor fines, activity, and trends. Automation handles the rest.' },
              ].map((step, i) => (
                <div key={i} className="text-center relative z-10 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#BAED91] flex items-center justify-center text-sm font-bold text-[#2D5012] mx-auto mb-6 shadow-sm">
                    {step.n}
                  </div>
                  <h4 className="text-base font-bold mb-3">{step.title}</h4>
                  <p className="text-sm text-[#767676] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-4 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h2>
            <p className="text-lg text-[#767676] max-w-xl mx-auto leading-relaxed">
              Start free. Scale when ready. No surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-start">
            {/* Free Tier */}
            <div className="bg-white border border-black/[0.08] p-10 rounded-3xl animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#767676] mb-6">Free</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">0</span>
              </div>
              <div className="text-sm text-[#767676] mb-8">Forever free</div>
              <p className="text-sm text-[#767676] mb-8 leading-relaxed">For small community libraries or evaluating the platform.</p>
              <div className="h-px bg-black/[0.08] mb-8"></div>
              <ul className="space-y-4 mb-10">
                {['Up to 500 books', 'Up to 50 members', 'Basic borrow & return', 'Member dashboard', 'Email support'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#3a3a3a]">
                    <Check size={16} className="text-[#BAED91]" strokeWidth={3} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full block text-center py-3 rounded-xl border border-black/[0.08] text-sm font-bold hover:bg-[#f8f8f6] hover:border-black/20 transition-all">
                Get started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#f7fcf2] border-2 border-[#BAED91] p-10 rounded-3xl relative animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#BAED91] text-[#2D5012] px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Most popular
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#767676] mb-6">Pro</div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold">$</span>
                <span className="text-5xl font-extrabold tracking-tight text-[#0d0d0d]">29</span>
              </div>
              <div className="text-sm text-[#767676] mb-8">per month, billed annually</div>
              <p className="text-sm text-[#767676] mb-8 leading-relaxed">The full toolkit for growing libraries that need automation.</p>
              <div className="h-px bg-[#BAED91]/30 mb-8"></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Unlimited books & members',
                  'Barcode scanning',
                  'Automatic fine calculation',
                  'Reservation queue',
                  'Analytics & reports',
                  'Audit logs',
                  'Priority support'
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#3a3a3a]">
                    <Check size={16} className="text-[#2D5012]" strokeWidth={3} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="w-full block text-center py-3 rounded-xl bg-[#BAED91] text-[#2D5012] text-sm font-bold hover:bg-[#9BD26E] hover:-translate-y-0.5 transition-all shadow-lg active:translate-y-0">
                Start Pro trial
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white border border-black/[0.08] p-10 rounded-3xl animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#767676] mb-6">Enterprise</div>
              <div className="text-4xl font-extrabold tracking-tight mb-2">Custom</div>
              <div className="text-sm text-[#767676] mb-8 invisible">Placeholder</div>
              <p className="text-sm text-[#767676] mb-8 leading-relaxed">For multi-branch institutions with advanced needs and dedicated support.</p>
              <div className="h-px bg-black/[0.08] mb-8"></div>
              <ul className="space-y-4 mb-10">
                {[
                  'Everything in Pro',
                  'Multi-branch management',
                  'Custom roles & permissions',
                  'SSO / SAML integration',
                  'Dedicated account manager',
                  'On-premise option'
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#3a3a3a]">
                    <Check size={16} className="text-[#BAED91]" strokeWidth={3} /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl border border-black/[0.08] text-sm font-bold hover:bg-[#f8f8f6] hover:border-black/20 transition-all cursor-pointer">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#767676] mb-4 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Common questions</h2>
          </div>

          <div className="max-w-3xl mx-auto mt-16 space-y-px bg-black/[0.08] border border-black/[0.08] rounded-2xl overflow-hidden animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            {[
              { q: 'Is Shelfcentral suitable for schools and universities?', a: 'Absolutely. Shelfcentral is purpose-built for educational institutions. Schools and universities can manage unlimited students as members, set role-based access for librarians and administrators, and use the analytics dashboard to track reading engagement across departments.' },
              { q: 'Does it support barcode systems?', a: 'Yes. Each book copy gets a unique barcode. Staff can use any standard USB scanner to check out or return books instantly. Labels can be printed directly from the platform.' },
              { q: 'Can each library manage its own data independently?', a: 'Yes. Shelfcentral uses a multi-tenant architecture where each library has a completely isolated data environment. Your members, books, and logs are never accessible to other institutions on the platform.' },
              { q: 'Is there a self-service member dashboard?', a: 'Yes. Members get their own login to view borrowings and due dates, check fine balances, manage reservations, and browse the catalog — all without staff involvement.' },
              { q: 'Can fines be automated?', a: 'Yes. You define fine policies — daily rates per category, grace periods, and caps — and Shelfcentral enforces them automatically. Fines accrue the moment a loan goes overdue, visible to staff and the borrower in real time.' }
            ].map((item, i) => (
              <div key={i} className="bg-white">
                <button
                  className="w-full flex items-center justify-between p-7 text-left hover:bg-[#f8f8f6] transition-colors group cursor-pointer"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="text-[15px] font-bold text-[#0d0d0d] group-hover:text-[#2D5012] transition-colors">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#767676] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-7 pb-8">
                    <p className="text-[14px] text-[#767676] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-[#0d0d0d] py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#BAED91_0%,transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              Start modernizing your library <span className="font-['Instrument_Serif'] italic font-normal text-[#BAED91]">today</span>
            </h2>
            <p className="text-xl text-white/40 mb-12 leading-relaxed">
              Join forward-thinking institutions already on Shelfcentral. Free to start, easy to scale.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="bg-[#BAED91] text-[#2D5012] px-10 py-4 rounded-xl text-lg font-bold hover:bg-[#9BD26E] hover:-translate-y-0.5 transition-all shadow-xl shadow-[#BAED91]/10 active:translate-y-0">
                Start Free →
              </Link>
              <button className="px-10 py-4 rounded-xl text-lg font-semibold text-white/60 border border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white mb-6">
                <div className="w-8 h-8 bg-[#BAED91] rounded-lg flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="2" width="12" height="2" rx=".8" fill="#0d0d0d"/>
                    <rect x="1" y="6" width="9" height="2" rx=".8" fill="#0d0d0d" className="opacity-70"/>
                    <rect x="1" y="10" width="10" height="2" rx=".8" fill="#0d0d0d" className="opacity-50"/>
                  </svg>
                </div>
                <span>Shelfcentral</span>
              </Link>
              <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                Modern library management for schools, universities, and community institutions.
              </p>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Product</h5>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Dashboard', 'Changelog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Resources</h5>
              <ul className="space-y-4">
                {['Documentation', 'API Reference', 'GitHub', 'Status'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-6">Company</h5>
              <ul className="space-y-4">
                {['About', 'Contact', 'Privacy', 'Terms'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-white/20">© { year } Shelfcentral. All rights reserved.</p>
            <p className="text-xs text-white/10 italic">Built for institutions that care about knowledge.</p>
          </div>
        </div>
      </footer>

      {/* Global CSS for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
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
      `}} />
    </div>
  );
}
