import Header from "./components/Header"
import Post from "./components/Post"

function App() {
  return (
    <>
      <main className="w-[80%] mx-auto">
        <Header />
        <Post />
        <Post />
        <Post />
      </main>
    </>
  )
}

export default App