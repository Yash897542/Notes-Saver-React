import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
    const [title , setTitle] = useState('');
    const [value , setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state)=>state.paste.pastes);

    function createPaste(){

    if (title.trim() === "" || value.trim() === "") {
    toast.error("Title and Content cannot be empty");
    return;
  }

      const paste ={
      title : title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
  if(pasteId){
    dispatch(updateToPastes(paste));
  }
  else{
    dispatch(addToPastes(paste));
  }

  setTitle("");
  setValue("");
  setSearchParams({});
}
  useEffect(()=>{
    const paste = allPastes.find((p)=>p._id === pasteId);
    console.log("pasteId:",pasteId);
    console.log("allPastes:",allPastes);
    console.log("Found paste:",paste);
    if(paste){
      setTitle(paste.title);
      setValue(paste.content);
    }
  },[pasteId])

  return (
  <div className="max-w-6xl mx-auto px-4 py-8">

    {/* Input + Button */}
    <div className="flex flex-col md:flex-row gap-4 items-center">

      <input
        className="w-full md:flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition"
        type="text"
        placeholder="Enter title here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={createPaste}
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
      >
        {pasteId ? "Update My Notes" : "Create My Notes"}
      </button>

    </div>

    {/* Textarea */}

    <div className="mt-8">

      <textarea
        className="w-full min-h-[500px] bg-slate-800 border border-slate-600 rounded-xl p-5 text-white placeholder-gray-400 outline-none focus:border-blue-500 resize-none transition"
        value={value}
        placeholder="Enter your content here..."
        onChange={(e) => setValue(e.target.value)}
      />

    </div>
     <Toaster position="top-right" />
  </div>


  )
}

export default Home
