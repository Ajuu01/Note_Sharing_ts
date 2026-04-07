'use client'

import React, { useState } from 'react'

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    file: null as File | null,
  })

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

    console.log('Submitting...')
    console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL)
    console.log('Form data:', formData)

    const data = new FormData()
    data.append('title', formData.title)
    data.append('subtitle', formData.subtitle)
    data.append('description', formData.description)

    if (formData.file) {
      data.append('file', formData.file)
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`,
        {
          method: 'POST',
          body: data,
        }
      )

      const result = await response.json()
      console.log('Note created:', result)

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create note')
      }

      alert('Note created successfully')

      setFormData({
        title: '',
        subtitle: '',
        description: '',
        file: null,
      })
    } catch (error) {
      console.error('Submit error:', error)
      alert('Error creating note')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-24 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Note</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter note title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder:text-gray-500"
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
            placeholder="Enter subtitle"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder:text-gray-500"
            required
        />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write note description"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder:text-gray-500"
                required
            />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 placeholder:text-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Note
        </button>
      </form>
    </div>
  )
}

export default CreateNote