import { useState } from "react"
import { addMember } from "../services/memberService"

export default function AddMemberModal({
  showModal,
  setShowModal,
  onSuccess,
}) {

  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [lineId, setLineId] = useState("")
  const [loading, setLoading] = useState(false)

  if (!showModal) return null

  // CLOSE MODAL
  const handleClose = () => {
    setShowModal(false)
    setName("")
    setWhatsapp("")
    setLineId("")
  }

  // SAVE MEMBER
  const handleSaveMember = async () => {
    if (!name || !whatsapp) return

    try {
      setLoading(true)

      await addMember({
        name,
        whatsapp,
        lineId,
      })

      handleClose()

      if (onSuccess) {
        onSuccess()
      }

    } catch (error) {
      console.error("ADD MEMBER ERROR:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg p-8 rounded-[32px] relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold">
          Add Member
        </h2>

        {/* SUBTITLE */}
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Tambahkan member baru untuk menyimpan data.
        </p>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAMA */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nama
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
              className="w-full p-4 rounded-xl bg-violet-50 outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          {/* WHATSAPP */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nomor WhatsApp
            </label>

            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full p-4 rounded-xl bg-violet-50 outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          {/* LINE ID */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              ID Line
            </label>

            <input
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              placeholder="Username"
              className="w-full p-4 rounded-xl bg-violet-50 outline-none focus:ring-2 focus:ring-violet-300"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSaveMember}
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Member"}
          </button>

        </div>

      </div>

    </div>
  )
}