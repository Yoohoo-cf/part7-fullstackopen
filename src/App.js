import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, singleBlog } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import {
  Routes, Route, Link,
  BrowserRouter as Router,
  useParams
} from 'react-router-dom'
import { clearUser } from './reducers/userReducer'
import Users from './components/Users/Users'
import Blog from './components/Blog'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)

  const { id } = useParams()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(singleBlog(id))
  }, [dispatch, id])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch(clearUser())
  }

  if (!user) {
    return (
      <div>
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <div className='container'>
        <h1>blogs</h1>
        <Notification />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/create">create new</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route index element={<Blogs blogs={blogs} />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/blogs/:id" elements={<Blog />} />
          <Route path="/login" elements={<Login />} />
        </Routes>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </Router>
  )
}

export default App