import { useState, useContext, useEffect } from "react"
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css'
import {AppContext} from '../context/AppContext'
import {useNavigate} from 'react-router-dom'
import axios from "axios"

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link'
  ]

const CreatePostPage = () => {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState("")

  const {ARTICLE_API_URL, user} = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
  }, [user, navigate])

  const createNewPost = async (e) => {
    e.preventDefault()

    if (!files) {
      alert("Dodaj plik");
      return;
    }

    if (!content || content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      alert("Wpisz treść artykułu");
      return;
    }

    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('file', files[0])

    try {
      const response = await axios.post(`${ARTICLE_API_URL}/post`, data, {withCredentials: true})       
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
        <form onSubmit={createNewPost}>
            <input 
                type='title' 
                placeholder='Tytuł'
                className="border border-gray-400 rouned-sm w-full px-2 mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input 
                type='summary' 
                placeholder='Streszczenie'
                className="border border-gray-400 rouned-sm w-full px-2 mb-2"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
            />
            <div className="mb-2">
              <input 
                  type='file' 
                  accept="image/*"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setFiles(e.target.files)}
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer border border-gray-400 rounded-sm px-3 py-2 inline-block"
              >
                Wybierz zdjęcie
              </label>
              {files && files[0] && (
                <p className="text-sm text-gray-600 mt-1">
                  Wybrano: {files[0].name}
                </p>
              )}
            </div>
            <ReactQuill value={content} modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)} />
            <button type="submit" className="rounded-lg px-3 py-1 bg-gray-700 text-white w-full mt-2 cursor-pointer">Stwórz artykuł</button>
        </form>
    </div>
  )
}

export default CreatePostPage