import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage, db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export default function AddBatchModal({
  showModal,
  setShowModal,
  onAddBatch,
}) {
  const [batchName, setBatchName] = useState("")
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!showModal) return null

  // ======================
  // CLOSE
  // ======================
  const handleClose = () => {
    setShowModal(false)
    setBatchName("")
    setPreview(null)
    setFile(null)
    setError("")
  }

  // ======================
  // IMAGE CHANGE (keep preview + file)
  // ======================
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setFile(file)
    setPreview(URL.createObjectURL(file))
  }

  // ======================
  // REMOVE IMAGE
  // ======================
  const handleRemoveImage = () => {
    setFile(null)
    setPreview(null)
  }

  // ======================
  // UPLOAD TO FIREBASE STORAGE
  // ======================
  const uploadImage = async () => {
    if (!file) return null

    const imageRef = ref(
      storage,
      `batches/${Date.now()}-${file.name}`
    )

    await uploadBytes(imageRef, file)

    const url = await getDownloadURL(imageRef)
    return url
  }

  // ======================
  // SAVE TO FIRESTORE
  // ======================
  const handleSave = async () => {
    if (!batchName.trim()) {
      setError("Batch name wajib diisi")
      return
    }

    try {
      setLoading(true)

      const imageUrl = await uploadImage()

      const newBatch = {
        batchName: batchName.trim(),
        image: imageUrl || null,
        createdAt: new Date(),
        items: [],
      }

      // 🔥 SIMPAN KE DATABASE
      const docRef = await addDoc(
        collection(db, "batches"),
        newBatch
      )

      // 🔥 kirim ke parent (biar UI langsung update)
      onAddBatch({
        id: docRef.id,
        ...newBatch,
      })

      handleClose()
    } catch (err) {
      console.error(err)
      setError("Gagal menyimpan batch")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-2xl border border-violet-100 relative">

        {/* CLOSE ICON (UNCHANGED) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-violet-100 hover:bg-red-100 flex items-center justify-center text-violet-700 hover:text-red-500"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-violet-700">
          Add Batch
        </h2>

        <p className="text-sm text-slate-500 mt-1 mb-5">
          Tambahkan batch baru
        </p>

        {/* NAME (UNCHANGED) */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-slate-700">
            Nama Batch
          </label>

          <input
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl bg-violet-50 border border-violet-100"
            placeholder="Batch 1 - January"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </div>

        {/* IMAGE (UNCHANGED UI, ONLY LOGIC ADDED ABOVE) */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-slate-700">
            Gambar Batch
          </label>

          {!preview ? (
            <label className="mt-2 flex justify-center items-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 cursor-pointer hover:bg-violet-100 transition">
              📷 Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative mt-2">
              <img
                src={preview}
                className="w-full h-44 object-cover rounded-xl border"
                alt="preview"
              />

              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-violet-600 text-white py-2 rounded-xl font-semibold hover:bg-violet-700"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  )
}