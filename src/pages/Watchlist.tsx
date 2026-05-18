import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { watchlist as initial } from '@/data/portfolio'
import { formatCurrency, formatPct, cn } from '@/lib/utils'
import type { WatchlistItem } from '@/types'

export function Watchlist() {
  const [items, setItems] = useState<WatchlistItem[]>(initial)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ symbol: '', alertPrice: '' })

  function add() {
    if (!draft.symbol) return
    setItems([
      ...items,
      {
        id: `w${Date.now()}`,
        symbol: draft.symbol.toUpperCase(),
        name: `${draft.symbol.toUpperCase()} Holdings`,
        sector: 'Technology',
        currentPrice: 100,
        dayChangePct: 0,
        alertPrice: draft.alertPrice ? Number(draft.alertPrice) : undefined,
        addedOn: new Date().toISOString().slice(0, 10),
      },
    ])
    setDraft({ symbol: '', alertPrice: '' })
    setAdding(false)
  }

  function remove(id: string) {
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="p-8 max-w-5xl">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Watchlist</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} symbols tracked</p>
        </div>
        <Button onClick={() => setAdding(true)}>
          <Plus className="h-4 w-4" />
          Add symbol
        </Button>
      </header>

      {adding && (
        <div className="border rounded-lg p-4 mb-4 bg-muted/30">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="new-symbol" className="text-xs">Symbol</Label>
              <Input
                id="new-symbol"
                placeholder="e.g. AAPL"
                value={draft.symbol}
                onChange={(e) => setDraft({ ...draft, symbol: e.target.value })}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-alert" className="text-xs">Alert price (optional)</Label>
              <Input
                id="new-alert"
                type="number"
                placeholder="0.00"
                value={draft.alertPrice}
                onChange={(e) => setDraft({ ...draft, alertPrice: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setAdding(false)}>Cancel</Button>
              <Button onClick={add}>Add</Button>
            </div>
          </div>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr>
              <th className="text-left font-medium h-9 px-3">Symbol</th>
              <th className="text-left font-medium h-9 px-3">Sector</th>
              <th className="text-right font-medium h-9 px-3">Price</th>
              <th className="text-right font-medium h-9 px-3">Day %</th>
              <th className="text-right font-medium h-9 px-3">Alert</th>
              <th className="text-left font-medium h-9 px-3">Added</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t hover:bg-muted/30 transition-colors group">
                <td className="px-3 py-2.5">
                  <div className="font-medium">{item.symbol}</div>
                  <div className="text-xs text-muted-foreground">{item.name}</div>
                </td>
                <td className="px-3 py-2.5">
                  <Badge variant="secondary" className="font-normal">{item.sector}</Badge>
                </td>
                <td className="px-3 py-2.5 text-right tabular">{formatCurrency(item.currentPrice)}</td>
                <td className={cn(
                  'px-3 py-2.5 text-right tabular',
                  item.dayChangePct >= 0 ? 'text-success' : 'text-destructive'
                )}>
                  {formatPct(item.dayChangePct)}
                </td>
                <td className="px-3 py-2.5 text-right tabular text-muted-foreground">
                  {item.alertPrice ? formatCurrency(item.alertPrice) : '—'}
                </td>
                <td className="px-3 py-2.5 text-muted-foreground text-xs">{item.addedOn}</td>
                <td className="px-1">
                  <button
                    onClick={() => remove(item.id)}
                    className="h-7 w-7 inline-flex items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
