import { useState } from "react"

export default function AddRekapanModal({
  showModal,
  setShowModal,
  onAdd,
}) {
  const [batch, setBatch] = useState("")
  const [nama, setNama] = useState("")
  const [barang, setBarang] = useState("")
  const [qty, setQty] = useState("")
  const [harga, setHarga] = useState("")

  const [errors, setErrors] = useState({})

  if (!showModal) return null

  // CLOSE
  const handleClose = () => {
    setShowModal(false)

    setBatch("")
    setNama("")
    setBarang("")
    setQty("")
    setHarga("")
    setErrors({})
  }

  // VALIDATE
  const validate = () => {
    let err = {}

    if (!batch) err.batch = "Batch wajib diisi"
    if (!nama) err.nama = "Nama wajib diisi"
    if (!barang) err.barang = "Barang wajib diisi"
    if (!qty) err.qty = "Qty wajib diisi"
    if (!harga) err.harga = "Harga wajib diisi"

    setErrors(err)

    return Object.keys(err).length === 0
  }

  // SAVE
  const handleSave = () => {
    if (!validate()) return

    onAdd({
      batch,
      nama,
      barang,
      qty: Number(qty),
      harga: Number(harga),
      pembayaran: "DP",
    })

    handleClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg p-8 rounded-[32px] relative">

        {/* CLOSE */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold">
          Add Rekapan Korea
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-6">
          Tambahkan data rekapan pembelian Korea.
        </p>

        {/* FORM */}
        <div className="space-y-5">

          {/* ================= BATCH ================= */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              📦 Batch
            </label>

            <input
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Contoh: Batch 1"
              className="w-full p-4 rounded-xl bg-violet-50"
            />

            {errors.batch && (
              <p className="text-red-500 text-sm mt-1">
                {errors.batch}
              </p>
            )}
          </div>

          {/* ================= NAMA ================= */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              👤 Nama Anggota
            </label>

            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama member"
              className="w-full p-4 rounded-xl bg-violet-50"
            />

            {errors.nama && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nama}
              </p>
            )}
          </div>

          {/* ================= BARANG ================= */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              🛍️ Nama Barang
            </label>

            <input
              value={barang}
              onChange={(e) => setBarang(e.target.value)}
              placeholder="Album / Merchandise"
              className="w-full p-4 rounded-xl bg-violet-50"
            />

            {errors.barang && (
              <p className="text-red-500 text-sm mt-1">
                {errors.barang}
              </p>
            )}
          </div>

          {/* ================= QTY ================= */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              📦 Quantity
            </label>

            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Jumlah"
              className="w-full p-4 rounded-xl bg-violet-50"
            />

            {errors.qty && (
              <p className="text-red-500 text-sm mt-1">
                {errors.qty}
              </p>
            )}
          </div>

          {/* ================= HARGA ================= */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              💰 Harga
            </label>

            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="Total harga"
              className="w-full p-4 rounded-xl bg-violet-50"
            />

            {errors.harga && (
              <p className="text-red-500 text-sm mt-1">
                {errors.harga}
              </p>
            )}
          </div>

          {/* SAVE */}
          <button
            onClick={handleSave}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold"
          >
            Save Rekapan
          </button>

        </div>

      </div>
    </div>
  )
}