import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ user, setUser] = useState(null)

  const [successMessage, setSuccessMessage ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON =
    window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {

        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author}`)
      })
  }

  const setDeleteOf = (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)

    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
        })
    }
  }


  if ( user === null) {
    return (
      <div className='login-container'>
        <h2>Log in to bloglist website!</h2>
        <Notification successMessage={successMessage} errorMessage={errorMessage}/>
        <Togglable buttonLabel="log in">
          <LoginForm
            handleLogin={handleLogin}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
      <div className='bloglist'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            setDelete = {() => setDeleteOf(blog.id)}/>
        )}
      </div>
    </div>
  )
}

export default App