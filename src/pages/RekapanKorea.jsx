import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AddRekapanModal from "../components/AddRekapanModal"
import AddBatchModal from "../components/AddBatchModal"

export default function RekapanKorea() {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [showRekapanModal, setShowRekapanModal] = useState(false)
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [openBatch, setOpenBatch] = useState(null)

  const [batches, setBatches] = useState([
    {
      id: 1,
      batchName: "Batch 1 - January",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      createdAt: new Date(),
      items: [
        {
          id: 1,
          memberName: "Suci",
          productName: "Aespa Album",
          quantity: 1,
          price: 250000,
          paymentStatus: "DP",
        },
      ],
    },
  ])

  // =========================
  // ADD REKAPAN
  // =========================
  const handleAddRekapan = (data) => {
    const newItem = {
      id: Date.now(),
      memberName: data.nama,
      productName: data.barang,
      quantity: Number(data.qty),
      price: Number(data.harga),
      paymentStatus: "DP",
    }

    setBatches((prev) =>
      prev.map((b) =>
        b.batchName === data.batch
          ? { ...b, items: [...(b.items || []), newItem] }
          : b
      )
    )
  }

  // =========================
  // ADD BATCH (WITH IMAGE)
  // =========================
  const handleAddBatch = (data) => {
    const newBatch = {
      id: Date.now(),
      batchName: data.batchName,
      image: data.image || null, // 👈 penting
      createdAt: new Date(),
      items: [],
    }

    setBatches((prev) => [...prev, newBatch])
  }

  const handleDelete = (batchId, itemId) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              items: (b.items || []).filter((i) => i.id !== itemId),
            }
          : b
      )
    )
  }

  const handleEdit = (item) => {
    console.log("edit:", item)
  }

  const updatePayment = (batchId, itemId, status) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              items: (b.items || []).map((i) =>
                i.id === itemId
                  ? { ...i, paymentStatus: status }
                  : i
              ),
            }
          : b
      )
    )
  }

  const filtered = batches.map((b) => ({
    ...b,
    items: (b.items || []).filter((i) => {
      const k = search.toLowerCase()
      return (
        i.memberName?.toLowerCase().includes(k) ||
        i.productName?.toLowerCase().includes(k) ||
        i.paymentStatus?.toLowerCase().includes(k)
      )
    }),
  }))

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-8">

      {/* BACK */}
      <button
        onClick={() => navigate("/rekapan")}
        className="mb-6 flex items-center gap-2 px-5 py-2 rounded-2xl bg-violet-100 text-violet-700 font-semibold"
      >
        ← Back
      </button>

      {/* MAIN */}
      <div className="bg-white rounded-[32px] p-6">

        {/* TITLE */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black text-violet-600">
                REKAPAN KOREA
              </h1>

              <img
                src="https://flagcdn.com/w80/kr.png"
                className="h-8"
                alt="KR"
              />
            </div>

            <p className="text-slate-500 mt-2">
              Manage batch rekapan Korea
            </p>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-between items-center mb-6">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-[320px] px-5 py-3 rounded-2xl bg-violet-50"
          />

          <div className="flex gap-3">

            <button
              onClick={() => setShowBatchModal(true)}
              className="px-6 py-3 rounded-2xl bg-violet-600 text-white font-bold"
            >
              + Add Batch
            </button>

            <button
              onClick={() => setShowRekapanModal(true)}
              className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-bold"
            >
              + Add Rekapan
            </button>

          </div>
        </div>

        {/* BATCH LIST */}
        <div className="space-y-6">

          {filtered.map((batch) => (
            <div key={batch.id} className="border border-violet-100 rounded-2xl overflow-hidden">

              {/* HEADER */}
              <button
                onClick={() =>
                  setOpenBatch(openBatch === batch.id ? null : batch.id)
                }
                className="w-full flex justify-between p-4 bg-violet-50"
              >
                <span className="font-bold text-violet-700">
                  {batch.batchName}
                </span>
                <span>{openBatch === batch.id ? "▲" : "▼"}</span>
              </button>

              {/* EXPANDED CONTENT */}
              {openBatch === batch.id && (
                <div>

                  {/* 🔥 FULL WIDTH IMAGE HERO */}
                  {batch.image && (
                    <div className="w-full h-[260px] bg-violet-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={batch.image}
                        alt="batch"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}

                  {/* TABLE */}
                  <div className="p-4 overflow-x-auto">

                    <table className="w-full table-fixed">

                      <thead>
                        <tr className="text-violet-700 border-b">

                          <th className="w-[18%] text-center py-3">Member</th>
                          <th className="w-[18%] text-center">Product</th>
                          <th className="w-[12%] text-center">Qty</th>
                          <th className="w-[18%] text-center">Price</th>
                          <th className="w-[18%] text-center">Payment</th>
                          <th className="w-[16%] text-center">Action</th>

                        </tr>
                      </thead>

                      <tbody>

                        {(batch.items || []).map((i) => (
                          <tr key={i.id} className="border-b border-violet-50">

                            <td className="text-center py-3 font-semibold">
                              {i.memberName}
                            </td>

                            <td className="text-center">{i.productName}</td>

                            <td className="text-center">{i.quantity}</td>

                            <td className="text-center text-violet-600 font-bold">
                              Rp {i.price}
                            </td>

                            <td>
                              <div className="flex justify-center gap-2">

                                <button
                                  onClick={() =>
                                    updatePayment(batch.id, i.id, "DP")
                                  }
                                  className="px-3 py-1 bg-violet-200 rounded-lg"
                                >
                                  DP
                                </button>

                                <button
                                  onClick={() =>
                                    updatePayment(batch.id, i.id, "Lunas")
                                  }
                                  className="px-3 py-1 bg-green-500 text-white rounded-lg"
                                >
                                  Lunas
                                </button>

                              </div>
                            </td>

                            <td>
                              <div className="flex justify-center gap-2">

                                <button className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center">
                                  ✏️
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(batch.id, i.id)
                                  }
                                  className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center"
                                >
                                  🗑️
                                </button>

                              </div>
                            </td>

                          </tr>
                        ))}

                      </tbody>

                    </table>

                  </div>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>

      {/* MODALS */}
      <AddRekapanModal
        showModal={showRekapanModal}
        setShowModal={setShowRekapanModal}
        onAdd={handleAddRekapan}
      />

      <AddBatchModal
        showModal={showBatchModal}
        setShowModal={setShowBatchModal}
        onAddBatch={handleAddBatch}
      />

    </div>
  )
}