import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Positions } from '@/pages/Positions'
import { PositionDetail } from '@/pages/PositionDetail'
import { Watchlist } from '@/pages/Watchlist'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="positions" element={<Positions />} />
        <Route path="positions/:id" element={<PositionDetail />} />
        <Route path="watchlist" element={<Watchlist />} />
      </Route>
    </Routes>
  )
}
