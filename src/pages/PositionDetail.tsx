import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { positions } from '@/data/portfolio'
import { formatCurrency, formatPct, cn } from '@/lib/utils'

export function PositionDetail() {
  const { id } = useParams<{ id: string }>()
  const position = positions.find((p) => p.id === id)

  if (!position) {
    return (
      <div className="p-8">
        <p className="text-sm text-muted-foreground">Position not found.</p>
        <Link to="/positions" className="text-sm underline mt-2 inline-block">
          Back to positions
        </Link>
      </div>
    )
  }

  const marketValue = position.shares * position.currentPrice
  const cost = position.shares * position.avgCost
  const pl = marketValue - cost
  const plPct = (pl / cost) * 100

  return (
    <div className="p-8 max-w-5xl">
      <Link
        to="/positions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Positions
      </Link>

      <header className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{position.symbol}</h1>
            <Badge variant="secondary">{position.sector}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{position.name}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold tabular">{formatCurrency(position.currentPrice)}</div>
          <div className={cn(
            'text-xs tabular',
            position.dayChangePct >= 0 ? 'text-success' : 'text-destructive'
          )}>
            {formatPct(position.dayChangePct)} today
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle>Market value</CardTitle></CardHeader>
          <CardContent>
            <div className="text-xl font-semibold tabular">{formatCurrency(marketValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle>Cost basis</CardTitle></CardHeader>
          <CardContent>
            <div className="text-xl font-semibold tabular text-muted-foreground">{formatCurrency(cost)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle>Unrealized P/L</CardTitle></CardHeader>
          <CardContent>
            <div className={cn(
              'text-xl font-semibold tabular',
              pl >= 0 ? 'text-success' : 'text-destructive'
            )}>
              {formatCurrency(pl)}
            </div>
            <div className={cn('text-xs tabular', pl >= 0 ? 'text-success' : 'text-destructive')}>
              {formatPct(plPct)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/*
        Mixed-density form — intentionally uneven.
        Safe config (notes, tags) gets compact treatment.
        Consequential fields (target allocation, stop loss, share count change) get more weight.
        This is the surface Dessn should be evaluated on for compactness redesigns.
      */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-foreground font-medium">Edit position</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* High-weight section: trade details */}
          <section className="space-y-3">
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Trade details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shares">Shares</Label>
                <Input id="shares" type="number" defaultValue={position.shares} className="h-10 text-base tabular" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgCost">Average cost</Label>
                <Input id="avgCost" type="number" defaultValue={position.avgCost} step="0.01" className="h-10 text-base tabular" />
              </div>
            </div>
          </section>

          {/* Compact safe-config section */}
          <section className="space-y-2 pt-2 border-t">
            <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Metadata</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="tag" className="text-xs">Tag</Label>
                <Input id="tag" placeholder="e.g. long-term" className="h-7 text-xs mt-1" />
              </div>
              <div>
                <Label htmlFor="account" className="text-xs">Account</Label>
                <Input id="account" defaultValue="Main" className="h-7 text-xs mt-1" />
              </div>
              <div>
                <Label htmlFor="opened" className="text-xs">Opened</Label>
                <Input id="opened" type="date" defaultValue="2024-03-15" className="h-7 text-xs mt-1" />
              </div>
            </div>
          </section>

          <div className="flex gap-2 justify-end pt-2 border-t">
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
