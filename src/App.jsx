import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import MemberPage from "./pages/MemberPage"
import RekapanPage from "./pages/RekapanPage"
import RekapanKorea from "./pages/RekapanKorea"

export default function App() {
  return (
    <Routes>
      {/* DASHBOARD */}
      <Route path="/" element={<Dashboard />} />

      {/* MEMBER PAGE */}
      <Route path="/members" element={<MemberPage />} />

      {/* REKAPAN DASHBOARD */}
      <Route path="/rekapan" element={<RekapanPage />} />
      
      {/* REKAPAN KOREA */}
      <Route path="/rekapan/korea" element={<RekapanKorea />} />
    </Routes>
  )
}