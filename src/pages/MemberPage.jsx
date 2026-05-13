import { useState } from "react"
import AddMemberModal from "../components/AddMemberModal"

export default function MemberPage() {
  const [showModal, setShowModal] = useState(false)

  const members = [
    {
      id: 1,
      name: "Kim Jennie",
      username: "@jennie",
      role: "Guest",
      email: "jennie@gmail.com",
    },
    {
      id: 2,
      name: "Minji",
      username: "@minji",
      role: "Admin",
      email: "minji@gmail.com",
    },
    {
      id: 3,
      name: "Karina",
      username: "@karina",
      role: "Guest",
      email: "karina@gmail.com",
    },
    {
      id: 4,
      name: "Wonyoung",
      username: "@wonyoung",
      role: "Guest",
      email: "wonyoung@gmail.com",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f7f5ff] p-8">

      {/* HEADER */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-violet-100 mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-violet-600">
            Daftar Anggota 👥
          </h1>

          <p className="text-slate-500 text-lg mt-2">
            Kelola seluruh member aplikasi KPOP Store.
          </p>
        </div>

        <div className="bg-violet-50 px-5 py-3 rounded-2xl border border-violet-100">
          <p className="font-semibold text-violet-700">
            Total Member: {members.length}
          </p>
        </div>

      </div>

      {/* SEARCH + BUTTON */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-violet-100 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* SEARCH */}
        <div className="relative w-full md:max-w-xl">

          <input
            type="text"
            placeholder="Search member..."
            className="w-full bg-violet-50 border border-violet-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-violet-200 text-slate-700"
          />

          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-violet-600 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition whitespace-nowrap"
        >
          + Add Member
        </button>

      </div>

      {/* MEMBER TABLE */}
      <div className="bg-white rounded-[32px] shadow-sm border border-violet-100 overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 bg-violet-50 px-8 py-5 border-b border-violet-100 font-bold text-violet-700">

          <div>Member</div>
          <div>Username</div>
          <div>Role</div>
          <div>Email</div>
          <div className="text-center">Action</div>

        </div>

        {/* TABLE BODY */}
        {members.map((member) => (
          <div
            key={member.id}
            className="grid grid-cols-5 items-center px-8 py-6 border-b border-violet-50 hover:bg-violet-50/50 transition"
          >

            {/* MEMBER */}
            <div className="flex items-center gap-4">

              <img
                src={`https://i.pravatar.cc/150?img=${member.id + 10}`}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-slate-800">
                  {member.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Member ID #{member.id}
                </p>
              </div>

            </div>

            {/* USERNAME */}
            <div className="text-slate-600 font-medium">
              {member.username}
            </div>

            {/* ROLE */}
            <div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  member.role === "Admin"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-violet-100 text-violet-700"
                }`}
              >
                {member.role}
              </span>

            </div>

            {/* EMAIL */}
            <div className="text-slate-600">
              {member.email}
            </div>

            {/* ACTION */}
            <div className="flex justify-center gap-3">

              <button className="bg-violet-100 hover:bg-violet-200 text-violet-700 px-5 py-2 rounded-xl font-semibold transition">
                Edit
              </button>

              <button className="bg-red-100 hover:bg-red-200 text-red-500 px-5 py-2 rounded-xl font-semibold transition">
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      <AddMemberModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

    </div>
  )
}