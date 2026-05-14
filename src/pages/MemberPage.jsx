import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { db } from "../firebase"
import AddMemberModal from "../components/AddMemberModal"

export default function MemberPage() {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState("")
  const [toast, setToast] = useState("")

  // REALTIME FIRESTORE
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
      setMembers(data)
    })

    return () => unsub()
  }, [])

  // DELETE MEMBER
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id))
      setToast("Member deleted 🗑️")
    } catch (error) {
      setToast("Failed to delete member")
    }
  }

  // AUTO TOAST
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500)
      return () => clearTimeout(t)
    }
  }, [toast])

  // SEARCH
  const filtered = members.filter((m) => {
    const k = search.toLowerCase()
    return (
      m.name?.toLowerCase().includes(k) ||
      m.whatsapp?.toLowerCase().includes(k) ||
      m.lineId?.toLowerCase().includes(k)
    )
  })

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-6 sm:p-10">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-5 py-3 rounded-full shadow-lg z-50 text-sm font-semibold">
          {toast}
        </div>
      )}

      {/* BACK */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 px-4 py-2 rounded-2xl bg-violet-100 border border-violet-200 text-violet-700 hover:bg-violet-200 transition font-semibold"
      >
        ← Back to Dashboard
      </button>

      {/* CONTAINER */}
      <div className="bg-white rounded-[32px] shadow-sm border border-violet-100 overflow-hidden">

        {/* HEADER */}
        <div className="p-6 sm:p-8 border-b border-violet-100">

          <h1 className="text-3xl sm:text-4xl font-black text-violet-600">
            Daftar Anggota 👥
          </h1>

          <p className="text-slate-500 mt-1">
            Manage member KPOP Store
          </p>

          {/* SEARCH + BUTTON */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

            {/* SEARCH */}
            <div className="relative w-full sm:w-[380px]">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member..."
                className="w-full px-5 py-3 pl-10 rounded-2xl bg-violet-50 border border-violet-100 focus:outline-none focus:ring-4 focus:ring-violet-200"
              />

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400">
                🔍
              </span>

            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition"
            >
              + Add Member
            </button>

          </div>

        </div>

        {/* TABLE HEADER */}
        <div className="text-center grid grid-cols-4 px-6 sm:px-8 py-4 bg-violet-50 font-bold text-violet-700 border-b border-violet-100">

          <div>Nama</div>
          <div>WhatsApp</div>
          <div>ID Line</div>
          <div className="text-center">Action</div>

        </div>

        {/* TABLE BODY */}
        <div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              No members found
            </div>
          ) : (
            filtered.map((m, i) => (
              <div
                key={m.id}
                className={`grid grid-cols-4 px-6 sm:px-8 py-5 items-center hover:bg-violet-50 transition ${
                  i !== filtered.length - 1
                    ? "border-b border-violet-100"
                    : ""
                }`}
              >

                <div className="font-semibold text-slate-800">
                  {m.name}
                </div>

                <div className="text-slate-600">
                  {m.whatsapp}
                </div>

                <div className="text-slate-600">
                  {m.lineId}
                </div>

                <div className="flex justify-center gap-3">

                    {/* EDIT ICON */}
                    <button
                        onClick={() => alert("Edit belum dibuat")}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-100 hover:bg-violet-200 transition"
                        title="Edit"
                    >     
                        ✏️
                    </button>

                    {/* DELETE ICON */}
                    <button
                        onClick={() => handleDelete(m.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition"
                        title="Delete"
                    >
                    🗑️
                    </button>

                </div>
              </div>
            ))
          )}

        </div>

      </div>

      {/* MODAL */}
      <AddMemberModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSuccess={() =>
          setToast("Member berhasil ditambahkan 🎉")
        }
      />

    </div>
  )
}