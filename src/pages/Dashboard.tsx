import { StatCard } from '@/components/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { positions, portfolioHistory } from '@/data/portfolio'
import { formatCurrency, formatPct } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function Dashboard() {
  const totalValue = positions.reduce((sum, p) => sum + p.shares * p.currentPrice, 0)
  const totalCost = positions.reduce((sum, p) => sum + p.shares * p.avgCost, 0)
  const totalGain = totalValue - totalCost
  const totalGainPct = (totalGain / totalCost) * 100
  const dayChange = positions.reduce(
    (sum, p) => sum + p.shares * p.currentPrice * (p.dayChangePct / 100),
    0
  )
  const dayChangePct = (dayChange / totalValue) * 100

  return (
    <div className="p-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Portfolio overview as of today</p>
      </header>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard label="Total value" value={formatCurrency(totalValue)} />
        <StatCard
          label="Today"
          value={formatCurrency(dayChange)}
          delta={formatPct(dayChangePct)}
          deltaTone={dayChange >= 0 ? 'positive' : 'negative'}
        />
        <StatCard
          label="Total gain"
          value={formatCurrency(totalGain)}
          delta={formatPct(totalGainPct)}
          deltaTone={totalGain >= 0 ? 'positive' : 'negative'}
        />
        <StatCard label="Positions" value={String(positions.length)} delta="Across 6 sectors" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio value · 30 days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioHistory} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={(d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px',
                  }}
                  formatter={(v: number) => [formatCurrency(v), 'Value']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
