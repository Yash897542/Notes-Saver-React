import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash, FaCopy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paste?"
    );

    if (confirmDelete) {
      dispatch(removeFromPastes(pasteId));
      toast.success("Paste Deleted Successfully");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Search Bar */}

      <div className="mb-8">
        <input
          className="w-full md:w-1/2 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
          type="search"
          placeholder="Search your paste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Empty State */}

      {pastes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-7xl">📝</div>

          <h2 className="text-3xl font-bold text-white mt-4">
            No Pastes Yet
          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            Create your first paste!
          </p>
        </div>
      ) : filteredData.length === 0 ? (

        /* Search Not Found */

        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl">🔍</div>

          <h2 className="text-3xl font-bold text-white mt-4">
            No Pastes Found
          </h2>

          <p className="text-gray-400 mt-2 text-lg">
            Try searching with another title.
          </p>
        </div>

      ) : (

        /* Paste Cards */

        <div className="flex flex-col gap-6">

          {filteredData.map((paste) => (

            <div
              key={paste._id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg hover:border-blue-500 transition-all duration-300"
            >

              {/* Title */}

              <h2 className="text-2xl font-bold text-white">
                {paste.title}
              </h2>

              {/* Content */}

              <p className="text-gray-300 mt-3 whitespace-pre-wrap break-words">
                {paste.content.length > 150
                  ? paste.content.substring(0, 150) + "..."
                  : paste.content}
              </p>

              {/* Buttons */}

              <div className="flex flex-wrap gap-3 mt-6">

                <Link to={`/?pasteId=${paste._id}`}>
                  <button
                    className="border border-blue-500 text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                </Link>

                <Link to={`/pastes/${paste._id}`}>
                  <button
                    className="border border-green-500 text-green-500 p-2 rounded-lg hover:bg-green-500 hover:text-white transition"
                    title="View"
                  >
                    <FaEye size={18} />
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(paste._id)}
                  className="border border-red-500 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                  title="Delete"
                >
                  <FaTrash size={18} />
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to Clipboard");
                  }}
                  className="border border-yellow-500 text-yellow-500 p-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
                  title="Copy"
                >
                  <FaCopy size={18} />
                </button>

              </div>

              {/* Date */}

              <div className="mt-5 text-sm text-gray-400">
                {new Date(paste.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>

            </div>

          ))}

        </div>
      )}

      <Toaster position="top-right" />

    </div>
  );
};

export default Paste;