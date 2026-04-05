'use client'

const PreviewButton=({filelink}:{filelink:string})=>{
    const handlePreview=()=>{
        window.open(filelink,"_blank")
    }
    return(
        <button onClick={handlePreview} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 rounded-full font-bold hover:bg-gray-300 ">
                Preview
        </button>
    )
}

export default PreviewButton