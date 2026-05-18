import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'negative' | 'neutral'
}

export function StatCard({ label, value, delta, deltaTone = 'neutral' }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tabular tracking-tight">{value}</div>
        {delta && (
          <div
            className={cn(
              'mt-1 text-xs tabular',
              deltaTone === 'positive' && 'text-success',
              deltaTone === 'negative' && 'text-destructive',
              deltaTone === 'neutral' && 'text-muted-foreground'
            )}
          >
            {delta}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
