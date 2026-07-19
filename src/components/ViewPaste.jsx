import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ViewPaste = () => {

  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center text-2xl mt-10 text-red-500">
        Paste Not Found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Title */}
      <div className="flex justify-between items-center gap-4">

        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none cursor-not-allowed"
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to Clipboard");
          }}
          className="border border-yellow-500 text-yellow-500 p-3 rounded-xl hover:bg-yellow-500 hover:text-black transition"
          title="Copy"
        >
          <FaCopy size={20} />
        </button>

      </div>

      {/* Content */}

      <div className="mt-8">

        <textarea
          value={paste.content}
          disabled
          rows={20}
          className="w-full min-h-[500px] bg-slate-800 border border-slate-600 rounded-xl p-5 text-white outline-none resize-none cursor-not-allowed whitespace-pre-wrap"
        />

      </div>

      {/* Created Date */}

      <div className="mt-5 text-gray-400 text-sm">
        Created At : {new Date(paste.createdAt).toLocaleString()}
      </div>

      <Toaster position="top-right" />

    </div>
  );
};

export default ViewPaste;