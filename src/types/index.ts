export type Sector =
  | 'Technology'
  | 'Financials'
  | 'Healthcare'
  | 'Energy'
  | 'Consumer'
  | 'Industrials'

export interface Position {
  id: string
  symbol: string
  name: string
  sector: Sector
  shares: number
  avgCost: number
  currentPrice: number
  dayChangePct: number
  lastUpdated: string
}

export interface WatchlistItem {
  id: string
  symbol: string
  name: string
  sector: Sector
  currentPrice: number
  dayChangePct: number
  alertPrice?: number
  addedOn: string
}

export interface PortfolioSnapshot {
  date: string
  value: number
}
