import { useEffect, useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useParams } from "react-router-dom"
import {format} from "date-fns"
import { pl } from 'date-fns/locale'
import axios from "axios"

const PostPage = () => {
  const {ARTICLE_API_URL} = useContext(AppContext)

  const [postInfo, setPostInfo] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${ARTICLE_API_URL}/post/${id}`, {
          withCredentials: true,
        });
        setPostInfo(data);
      } catch (error) {
        console.error("Błąd pobierania posta:", error.message);
      }
    };

    fetchPost();
  }, []);

  if (!postInfo) {
    return ''
  }

  return (
    <div>
      <h1>{postInfo.title}</h1>
      <p className='text-2xl text-gray-500'>Autor: {postInfo.author.username} | Data: {format(postInfo.createdAt, 'd MMMM yyyy HH:mm', {locale: pl})}</p>
      <img src={'http://localhost:3000/' + postInfo.cover} alt='' className='object-cover w-full h-[500px] m-5'></img>
      <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  )
}

export default PostPage