import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css'

const CreatePostPage = () => {
  return (
    <div>
        <form>
            <input 
                type='title' 
                placeholder='Tytuł'
                className="border border-gray-400 rouned-sm w-full px-2 mb-2"
            />
            <input 
                type='summary' 
                placeholder='Streszczenie'
                className="border border-gray-400 rouned-sm w-full px-2 mb-2"
            />
            <input 
                type='file' 
                className="border border-gray-400 rouned-sm w-full px-2 mb-2"
            />
            <ReactQuill />
            <button className="rounded-lg px-3 py-1 bg-gray-700 text-white w-full mt-2 cursor-pointer">Stwórz artykuł</button>
        </form>
    </div>
  )
}

export default CreatePostPage
