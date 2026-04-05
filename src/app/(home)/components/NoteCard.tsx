import { Note } from "@/types";
import React from "react";
import Link from "next/link";

const NoteCard = ({notes}:{notes:Note[]}) => {
  return (
    <div className="flex flex-row justify-between p-4 rounded-lg  min-h-full space-x-10">
      {
        notes.map((note)=>{
          return(
            <div  className="bg-white border border-stone-300 min-w-full"  key={note._id}>
              <img src={note.file} alt={note.title} width={800} height={200}/>
              <div className="grow mb-5">
                <h5 className="text-sm sm:text-lg leading-5 sm:leading-6 font-bold text-stone-900">
                  {note.title}
                </h5>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-stone-500">{note.subtitle}</p>
            </div>
            <div className="flex items-center justify-between">
              <Link className="text-blue-300" href={`/note/${note._id}`}>Read More</Link>
            </div>

        </div>
          )
        })
      }
    </div>
  );
};

export default NoteCard;