'use client'

import { useRouter } from 'next/navigation'

const DeleteButton = ({ noteId }: { noteId: string }) => {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this note?')

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`,
        {
          method: 'DELETE',
        }
      )

      const result = await response.json()
      console.log('Delete result:', result)

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete note')
      }

      alert('Note deleted successfully')
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Error deleting note')
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="w-full bg-red-500 text-white py-2 rounded-full font-bold hover:bg-red-600 transition"
    >
      Delete
    </button>
  )
}

export default DeleteButton