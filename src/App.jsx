import { useState } from "react"
import MemberPage from "./pages/MemberPage"

export default function App() {
  const [activePage, setActivePage] = useState("dashboard")

  const shortcutMenus = [
    {
      title: 'Daftar Anggota',
      description: 'Kelola data member dan pantau aktivitas mereka.',
      icon: '👥',
      color: 'from-violet-500 to-fuchsia-500',
      page: 'member',
    },
    {
      title: 'Proof CO',
      description: 'Upload bukti checkout pembelian barang.',
      icon: '🛍️',
      color: 'from-pink-500 to-rose-500',
      page: 'proofco',
    },
    {
      title: 'Rekapan Jajan',
      description: 'Lihat semua rekapan belanja member.',
      icon: '📋',
      color: 'from-indigo-500 to-blue-500',
      page: 'rekapan',
    },
  ]

  // OPEN MEMBER PAGE
  if (activePage === "member") {
    return <MemberPage />
  }

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-8">

      {/* HEADER */}
      <div className="bg-white rounded-[32px] p-6 flex justify-between items-center shadow-sm border border-violet-100 mb-8">

        <div>
          <h1 className="text-4xl font-black text-violet-600">
            KPOP STORE 💜
          </h1>

          <p className="text-slate-500 text-lg mt-2">
            Dashboard Management System
          </p>
        </div>

        <div className="flex items-center gap-4">

          <button className="w-14 h-14 bg-violet-100 rounded-2xl text-2xl">
            🔔
          </button>

          <div className="bg-violet-50 px-5 py-3 rounded-2xl flex items-center gap-4 border border-violet-100">

            <img
              src="https://i.pravatar.cc/100?img=32"
              alt="profile"
              className="w-14 h-14 rounded-full"
            />

            <div>
              <h3 className="font-bold text-lg">
                Super Admin
              </h3>

              <p className="text-sm text-slate-500">
                superadmin@kpop.com
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* BANNER */}
      <div className="bg-gradient-to-r from-violet-200 via-pink-100 to-fuchsia-100 rounded-[36px] p-10 mb-10 relative overflow-hidden">

        <div className="max-w-2xl relative z-10">

          <span className="bg-white/70 px-4 py-2 rounded-full text-violet-700 font-semibold inline-block mb-6">
            ✨ KPOP MANAGEMENT SYSTEM
          </span>

          <h2 className="text-5xl font-black leading-tight text-slate-800 mb-6">
            Kelola semua kebutuhan K-Pop kamu dalam satu tempat.
          </h2>

          <p className="text-lg text-slate-600 mb-8">
            Pantau member, upload proof checkout, dan kelola rekapan jajan dengan lebih mudah.
          </p>

        </div>

        <div className="absolute right-10 top-10 text-[180px] opacity-20">
          💜
        </div>

      </div>

      {/* SHORTCUT MENU */}
      <section>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-800 mb-2">
            Menu
          </h2>

          <p className="text-slate-500 text-lg">
            Akses cepat ke menu yang paling sering digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {shortcutMenus.map((menu) => (
            <div
              key={menu.title}
              className="bg-white rounded-[32px] p-8 border border-violet-100 shadow-sm hover:-translate-y-2 transition"
            >

              <div
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${menu.color} flex items-center justify-center text-5xl text-white mb-8 shadow-lg`}
              >
                {menu.icon}
              </div>

              <h3 className="text-3xl font-black text-slate-800 mb-4">
                {menu.title}
              </h3>

              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                {menu.description}
              </p>

              <button
                onClick={() => setActivePage(menu.page)}
                className={`bg-gradient-to-r ${menu.color} text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition`}
              >
                Open Menu →
              </button>

            </div>
          ))}

        </div>

      </section>

    </div>
  )
}