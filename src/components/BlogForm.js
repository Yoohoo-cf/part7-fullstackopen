import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', user: '' })


  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title:event.target.value })
  }

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog ({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    })
    setNewBlog({ title: '', author: '', url: '', user: '' })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title: <input value={newBlog.title} id='title' onChange={handleTitleChange}
        />
        <div> author: <input value={newBlog.author} id='author' onChange={handleAuthorChange}/>
        </div>
        <div>url: <input value={newBlog.url} id='url'onChange={handleUrlChange}/>
        </div>
      </div>
      <button id='create-button' type="submit">create</button>
    </form>
  )
}

export default BlogForm