import type { Position, WatchlistItem, PortfolioSnapshot } from '@/types'

export const positions: Position[] = [
  { id: 'p1', symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', shares: 120, avgCost: 142.30, currentPrice: 218.45, dayChangePct: 0.84, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p2', symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', shares: 75, avgCost: 280.10, currentPrice: 425.20, dayChangePct: -0.32, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p3', symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials', shares: 200, avgCost: 138.50, currentPrice: 198.75, dayChangePct: 1.24, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p4', symbol: 'UNH', name: 'UnitedHealth Group', sector: 'Healthcare', shares: 45, avgCost: 480.00, currentPrice: 512.30, dayChangePct: 0.18, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p5', symbol: 'XOM', name: 'Exxon Mobil Corporation', sector: 'Energy', shares: 300, avgCost: 95.20, currentPrice: 112.45, dayChangePct: -1.05, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p6', symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', shares: 60, avgCost: 320.00, currentPrice: 845.60, dayChangePct: 2.17, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p7', symbol: 'PG', name: 'Procter & Gamble Co.', sector: 'Consumer', shares: 150, avgCost: 142.00, currentPrice: 168.90, dayChangePct: 0.42, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p8', symbol: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', shares: 80, avgCost: 225.00, currentPrice: 348.20, dayChangePct: -0.67, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p9', symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', shares: 110, avgCost: 158.40, currentPrice: 162.15, dayChangePct: 0.09, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p10', symbol: 'GS', name: 'Goldman Sachs Group', sector: 'Financials', shares: 35, avgCost: 340.00, currentPrice: 478.50, dayChangePct: 1.58, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p11', symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer', shares: 90, avgCost: 195.30, currentPrice: 245.80, dayChangePct: -2.45, lastUpdated: '2026-05-19T14:30:00Z' },
  { id: 'p12', symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', shares: 55, avgCost: 125.00, currentPrice: 178.40, dayChangePct: 0.93, lastUpdated: '2026-05-19T14:30:00Z' },
]

export const watchlist: WatchlistItem[] = [
  { id: 'w1', symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', currentPrice: 195.20, dayChangePct: 1.12, alertPrice: 180.00, addedOn: '2026-04-12' },
  { id: 'w2', symbol: 'META', name: 'Meta Platforms', sector: 'Technology', currentPrice: 580.40, dayChangePct: -0.84, addedOn: '2026-04-22' },
  { id: 'w3', symbol: 'BAC', name: 'Bank of America', sector: 'Financials', currentPrice: 42.15, dayChangePct: 0.36, alertPrice: 40.00, addedOn: '2026-05-01' },
  { id: 'w4', symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', currentPrice: 28.40, dayChangePct: -1.20, addedOn: '2026-05-08' },
  { id: 'w5', symbol: 'COST', name: 'Costco Wholesale', sector: 'Consumer', currentPrice: 895.30, dayChangePct: 0.67, alertPrice: 850.00, addedOn: '2026-05-14' },
]

export const portfolioHistory: PortfolioSnapshot[] = Array.from({ length: 30 }, (_, i) => {
  const base = 245000
  const noise = Math.sin(i * 0.5) * 8000 + Math.cos(i * 0.3) * 4000
  const trend = i * 1200
  return {
    date: new Date(2026, 3, 20 + i).toISOString().slice(0, 10),
    value: Math.round(base + noise + trend),
  }
})

export const sectors: Array<'All' | Position['sector']> = [
  'All',
  'Technology',
  'Financials',
  'Healthcare',
  'Energy',
  'Consumer',
  'Industrials',
]
