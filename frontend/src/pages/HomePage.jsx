import { useEffect, useContext, useState } from "react"
import Post from "../components/Post"
import {AppContext} from "../context/AppContext"
import axios from 'axios'

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const {ARTICLE_API_URL} = useContext(AppContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${ARTICLE_API_URL}/post`, { withCredentials: true });
        setPosts(data);
      } catch (error) {
        console.error("Błąd pobierania postów:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </>
  )
}

export default HomePage
