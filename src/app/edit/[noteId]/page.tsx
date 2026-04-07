'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

const EditNotePage = () => {
  const router = useRouter()
  const params = useParams()
  const noteId = params.noteId as string

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    file: null as File | null,
    oldFile: '',
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch note')
        }

        const result = await response.json()
        const note = result.data

        setFormData({
          title: note.title,
          subtitle: note.subtitle,
          description: note.description,
          file: null,
          oldFile: note.file,
        })
      } catch (error) {
        console.error('Error fetching note:', error)
        alert('Failed to load note')
      } finally {
        setLoading(false)
      }
    }

    if (noteId) {
      fetchNote()
    }
  }, [noteId])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', formData.title)
    data.append('subtitle', formData.subtitle)
    data.append('description', formData.description)
    data.append('oldFile', formData.oldFile)

    if (formData.file) {
      data.append('file', formData.file)
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`,
        {
          method: 'PUT',
          body: data,
        }
      )

      const result = await response.json()
      console.log('Update result:', result)

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update note')
      }

      alert('Note updated successfully')
      router.push(`/note/${noteId}`)
      router.refresh()
    } catch (error) {
      console.error('Update error:', error)
      alert('Error updating note')
    }
  }

  if (loading) {
    return (
      <div className="mt-20 text-center text-lg text-gray-600">
        Loading note...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Note</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload New File (optional)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Note
        </button>
      </form>
    </div>
  )
}

export default EditNotePage