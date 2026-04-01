import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, LayoutDashboard, FileText, Target, Upload, BookOpen, Globe } from 'lucide-react';
import { useLang } from '../i18n';
import PetWidget from './PetWidget';

const navKeys = [
  { to: '/', icon: Home, labelKey: 'nav.overview', descKey: 'nav.overview.desc' },
  { to: '/child/michael', icon: LayoutDashboard, labelKey: 'nav.michael', descKey: 'nav.michael.desc' },
  { to: '/child/lucas', icon: LayoutDashboard, labelKey: 'nav.lucas', descKey: 'nav.lucas.desc' },
  { to: '/reports', icon: FileText, labelKey: 'nav.reports', descKey: 'nav.reports.desc' },
  { to: '/actions', icon: Target, labelKey: 'nav.actions', descKey: 'nav.actions.desc' },
  { to: '/upload', icon: Upload, labelKey: 'nav.upload', descKey: 'nav.upload.desc' },
];

const langOptions = [
  { value: 'en', label: 'EN' },
  { value: 'bi', label: '双语' },
  { value: 'zh', label: '中文' },
];

export default function Layout() {
  const { lang, setLang, t } = useLang();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar — hidden in fullscreen */}
      {!isFullscreen && (
      <aside className="w-64 bg-navy flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-navy-light">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-mustard rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-navy" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-cream-light font-[family-name:var(--font-display)]">{t('app.title')}</h1>
              <p className="text-[10px] text-teal-light/70">{t('app.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-0.5">
          {navKeys.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-teal text-cream-light font-semibold shadow-md'
                    : 'text-cream-dark/70 hover:bg-navy-light hover:text-cream-light'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <div className="truncate text-[13px]">{t(item.labelKey)}</div>
                <div className="text-[9px] truncate opacity-50">{t(item.descKey)}</div>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* ═══ Pet Widget (lower half) ═══ */}
        <div className="flex-1 overflow-y-auto border-t border-navy-light mt-1">
          <PetWidget />
        </div>

        {/* Language Toggle */}
        <div className="p-2 border-t border-navy-light">
          <div className="flex bg-navy-light rounded-lg p-0.5">
            {langOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setLang(opt.value)}
                className={`flex-1 text-[10px] py-1 rounded-md transition-all font-semibold ${
                  lang === opt.value
                    ? 'bg-mustard text-navy shadow-sm'
                    : 'text-cream-dark/60 hover:text-cream-light'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
      )}

      {/* Main content */}
      <main className={`flex-1 overflow-y-auto bg-cream ${isFullscreen ? 'w-full' : ''}`}>
        <Outlet context={{ isFullscreen }} />
      </main>
    </div>
  );
}
