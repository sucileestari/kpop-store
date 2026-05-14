import { useNavigate } from "react-router-dom"

export default function RekapanPage() {
  const navigate = useNavigate()

  const countries = [
    {
      name: "Korea",
      icon: "🇰🇷",
      color: "from-pink-500 to-violet-500",
      path: "/rekapan/korea",
    },
    {
      name: "Jepang",
      icon: "🇯🇵",
      color: "from-red-400 to-pink-500",
      path: "/rekapan/jepang",
    },
    {
      name: "Thailand",
      icon: "🇹🇭",
      color: "from-blue-400 to-cyan-500",
      path: "/rekapan/thailand",
    },
    {
      name: "China",
      icon: "🇨🇳",
      color: "from-red-500 to-orange-500",
      path: "/rekapan/china",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-100 border border-violet-200 text-violet-700 hover:bg-violet-200 transition font-semibold"
      >
        ← Back to Dashboard
      </button>

      {/* CONTAINER */}
      <div className="bg-white rounded-[32px] shadow-sm border border-violet-100 overflow-hidden">

        {/* HEADER */}
        <div className="p-6 sm:p-8 border-b border-violet-100 relative overflow-hidden">

          {/* BACKGROUND ICON */}
          <div className="absolute right-6 top-4 text-[160px] opacity-10">
            📋
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-violet-600 relative z-10">
            Rekapan Jajan 📋
          </h1>

          <p className="text-slate-500 mt-1 relative z-10">
            Pilih negara untuk melihat detail rekapan belanja member
          </p>

        </div>

        {/* GRID */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {countries.map((c) => (
            <div
              key={c.name}
              onClick={() => navigate(c.path)}
              className={`relative overflow-hidden p-8 rounded-[32px] text-white bg-gradient-to-br ${c.color} shadow-sm cursor-pointer hover:-translate-y-2 transition`}
            >

              {/* BACKGROUND ICON */}
              <div className="absolute right-4 top-4 text-6xl opacity-20">
                {c.icon}
              </div>

              {/* CONTENT */}
              <h2 className="text-2xl font-black relative z-10">
                {c.name}
              </h2>

              <p className="opacity-80 mt-2 relative z-10">
                Lihat rekapan {c.name}
              </p>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}