import React from "react";
import NoteCard from "./components/NoteCard";

export default async function Home() {
  const response=await fetch(`${process.env.BACKEND_URL}/notes`)
  if(!response.ok){
    throw new Error('Error occured during fetching')
  }
  const {data:notes}=await response.json()
  console.log(notes)
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NoteCard notes={notes} />
      </div>
    </div>
  );
};
