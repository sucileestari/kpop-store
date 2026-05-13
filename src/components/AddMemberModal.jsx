export default function AddMemberModal({ showModal, setShowModal }) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-lg rounded-[32px] p-8 relative shadow-2xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-3xl font-black text-violet-600 mb-2">
          Add New Member
        </h2>

        <p className="text-slate-500 mb-8">
          Tambahkan member baru ke dalam sistem.
        </p>

        {/* FORM */}
        <div className="space-y-6">

          {/* NAMA */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Nama
            </label>

            <input
              type="text"
              placeholder="Masukkan nama member"
              className="w-full bg-violet-50 border border-violet-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />
          </div>

          {/* NOMOR WA */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Nomor WA
            </label>

            <input
              type="text"
              placeholder="08xxxxxxxxxx"
              className="w-full bg-violet-50 border border-violet-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />
          </div>

          {/* ID LINE */}
          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              ID LINE
            </label>

            <input
              type="text"
              placeholder="username"
              className="w-full bg-violet-50 border border-violet-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-violet-200"
            />
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-gradient-to-r from-violet-600 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition"
          >
            Save Member
          </button>

        </div>

      </div>

    </div>
  )
}