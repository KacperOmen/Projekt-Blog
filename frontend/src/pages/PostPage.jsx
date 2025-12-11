import { useEffect, useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import axios from "axios"

const PostPage = () => {
  const { ARTICLE_API_URL, COMMENT_API_URL, user } = useContext(AppContext)

  const [postInfo, setPostInfo] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState(null)
  const { id } = useParams()

  const fetchPost = async () => {
    const { data } = await axios.get(`${ARTICLE_API_URL}/post/${id}`, { withCredentials: true })
    setPostInfo(data)
  }

  const fetchComments = async () => {
    const { data } = await axios.get(`${COMMENT_API_URL}/${id}`)
    setComments(data)
  }

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    await axios.post(
      `${COMMENT_API_URL}/${id}`,
      { content: newComment, parentComment: replyTo },
      { withCredentials: true }
    )

    setNewComment("")
    setReplyTo(null)
    fetchComments()
  }

  const renderComments = (list, level = 0) => {
    return list.map((c) => (
      <div
        key={c._id}
        className={`p-4 rounded-lg mt-4 ${
          level === 0 ? "bg-gray-100" : "bg-indigo-100 border-l-4 border-indigo-500"
        }`}
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span className="font-semibold text-gray-800">{c.author.username}</span>
          <span>{format(c.createdAt, "d MMM yyyy HH:mm", { locale: pl })}</span>
        </div>

        <p className="mb-3 text-gray-800">{c.content}</p>

        {user && (
          <button
            onClick={() => setReplyTo(c._id)}
            className="text-indigo-600 text-sm hover:underline"
          >
            Odpowiedz
          </button>
        )}

        {c.replies.length > 0 && renderComments(c.replies, level + 1)}
      </div>
    ))
  }

  if (!postInfo) return ""

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-2">{postInfo.title}</h1>
      <p className="text-gray-500 mb-6">
        Autor: <span className="font-semibold">{postInfo.author.username}</span> |{" "}
        {format(postInfo.createdAt, "d MMMM yyyy HH:mm", { locale: pl })}
      </p>
      
      <img
        src={postInfo.cover.startsWith('http')
              ? postInfo.cover
              : `${import.meta.env.VITE_API_URL}${postInfo.cover}`}
        alt=""
        className="w-full max-h-[500px] object-contain rounded-lg mb-8"
      />

      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Komentarze</h2>

        {user ? (
          <div className="mb-6">
            {replyTo && (
              <p className="text-indigo-600 font-medium mb-1">
                Odpowiadasz na komentarz
              </p>
            )}

            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Dodaj komentarz..."
            />

            <div className="mt-2 flex gap-2">
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Dodaj komentarz
              </button>

              {replyTo && (
                <button
                  onClick={() => setReplyTo(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Anuluj odpowiedź
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">Zaloguj się, aby komentować</p>
        )}

        <div>{renderComments(comments)}</div>
      </div>
    </div>
  )
}

export default PostPage
