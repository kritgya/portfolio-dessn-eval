import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { positions, sectors } from '@/data/portfolio'
import { formatCurrency, formatPct, cn } from '@/lib/utils'
import type { Position } from '@/types'

type SortKey = keyof Pick<Position, 'symbol' | 'shares' | 'currentPrice' | 'dayChangePct'>

export function Positions() {
  const [query, setQuery] = useState('')
  const [sector, setSector] = useState<(typeof sectors)[number]>('All')
  const [sortKey, setSortKey] = useState<SortKey>('symbol')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    let rows = positions.slice()
    if (sector !== 'All') rows = rows.filter((p) => p.sector === sector)
    if (query) {
      const q = query.toLowerCase()
      rows = rows.filter(
        (p) => p.symbol.toLowerCase().includes(q) || p.name.toLowerCase().includes(q)
      )
    }
    rows.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return rows
  }, [query, sector, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (key === sortKey) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Positions</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {positions.length} holdings</p>
        </div>
        <Button>Add position</Button>
      </header>

      {/* Filters bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by symbol or name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-1">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              className={cn(
                'h-8 px-3 text-xs rounded-md transition-colors',
                sector === s
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr>
              <th className="text-left font-medium h-9 px-3">
                <SortHeader label="Symbol" active={sortKey === 'symbol'} dir={sortDir} onClick={() => toggleSort('symbol')} />
              </th>
              <th className="text-left font-medium h-9 px-3">Sector</th>
              <th className="text-right font-medium h-9 px-3">
                <SortHeader label="Shares" active={sortKey === 'shares'} dir={sortDir} onClick={() => toggleSort('shares')} align="right" />
              </th>
              <th className="text-right font-medium h-9 px-3">Avg cost</th>
              <th className="text-right font-medium h-9 px-3">
                <SortHeader label="Price" active={sortKey === 'currentPrice'} dir={sortDir} onClick={() => toggleSort('currentPrice')} align="right" />
              </th>
              <th className="text-right font-medium h-9 px-3">
                <SortHeader label="Day %" active={sortKey === 'dayChangePct'} dir={sortDir} onClick={() => toggleSort('dayChangePct')} align="right" />
              </th>
              <th className="text-right font-medium h-9 px-3">Market value</th>
              <th className="text-right font-medium h-9 px-3">P/L</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const marketValue = p.shares * p.currentPrice
              const cost = p.shares * p.avgCost
              const pl = marketValue - cost
              const plPct = (pl / cost) * 100
              return (
                <tr key={p.id} className="border-t hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-2.5">
                    <Link to={`/positions/${p.id}`} className="block">
                      <div className="font-medium">{p.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{p.name}</div>
                    </Link>
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge variant="secondary" className="font-normal">{p.sector}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular">{p.shares.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-right tabular text-muted-foreground">{formatCurrency(p.avgCost)}</td>
                  <td className="px-3 py-2.5 text-right tabular">{formatCurrency(p.currentPrice)}</td>
                  <td className={cn(
                    'px-3 py-2.5 text-right tabular',
                    p.dayChangePct >= 0 ? 'text-success' : 'text-destructive'
                  )}>
                    {formatPct(p.dayChangePct)}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular font-medium">{formatCurrency(marketValue)}</td>
                  <td className={cn(
                    'px-3 py-2.5 text-right tabular',
                    pl >= 0 ? 'text-success' : 'text-destructive'
                  )}>
                    <div>{formatCurrency(pl)}</div>
                    <div className="text-xs opacity-70">{formatPct(plPct)}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align = 'left',
}: {
  label: string
  active: boolean
  dir: 'asc' | 'desc'
  onClick: () => void
  align?: 'left' | 'right'
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 hover:text-foreground transition-colors',
        align === 'right' && 'flex-row-reverse'
      )}
    >
      {label}
      <ArrowUpDown className={cn('h-3 w-3', active ? 'opacity-100' : 'opacity-30')} />
      {active && <span className="sr-only">{dir}</span>}
    </button>
  )
}
