import { NavLink, Outlet } from 'react-router-dom'
import { BarChart3, Briefcase, Eye, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/positions', label: 'Positions', icon: Briefcase },
  { to: '/watchlist', label: 'Watchlist', icon: Eye },
]

export function AppLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-56 border-r flex flex-col">
        <div className="h-14 flex items-center px-5 border-b">
          <span className="font-semibold tracking-tight">Folio</span>
          <span className="ml-2 text-xs text-muted-foreground">eval</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 px-3 h-8 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button className="flex items-center gap-2.5 px-3 h-8 rounded-md text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground w-full">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
