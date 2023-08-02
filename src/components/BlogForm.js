import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotificationTime } from '../reducers/notificationReducer'
import store from '../store'

const BlogForm = () => {

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const newBlog = {
      title,
      author,
      url,
    }

    dispatch(createBlog(newBlog))
    console.log(store.getState())
    dispatch(setNotificationTime(`A new blog ${title} by ${author}`, 10))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title: <input name='title' /></div>
        <div> author: <input name='author' /></div>
        <div>url: <input name='url' /></div>
        <button type="submit">create</button>
      </form >
    </div>
  )
}

export default BlogForm