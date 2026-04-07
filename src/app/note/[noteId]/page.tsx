import React from "react"
import { Note } from "@/types"
import PreviewButton from "./components/PreviewButton"
import Link from "next/link"
import DeleteButton from "./components/DeleteButton"

const SingleNote = async ({
  params,
}: {
  params: Promise<{ noteId: string }>
}) => {
  try {
    const { noteId } = await params

    const response = await fetch(
      `${process.env.BACKEND_URL}/notes/${noteId}`,
      {
        cache: "no-store",
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch note: ${response.status}`)
    }

    const result = await response.json()
    const note: Note = result.data

    return (
      <div className="bg-gray-100 py-8 mt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-xl shadow-md">
            
            <div className="md:w-1/2">
              <img
                src={note.file}
                alt={note.title}
                className="w-full h-400 object-cover rounded-lg"
              />

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="w-32">
                  <PreviewButton filelink={note.file} />
                </div>
                
                <Link href={`/edit/${note._id}`} className="w-32">
                  <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-full font-bold hover:bg-gray-300 transition">
                    Edit
                  </button>
                </Link> 

                <div className="w-32">
                  <DeleteButton noteId={note._id} />
                </div>               
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {note.title}
              </h2>

              <p className="text-lg text-gray-600 mb-4">
                {note.subtitle}
              </p>

              <p className="text-gray-700 leading-7">
                {note.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Single note page error:", error)

    return (
      <div className="mt-20 text-center text-red-500 text-xl">
        Failed to load single note
      </div>
    )
  }
}

export default SingleNote