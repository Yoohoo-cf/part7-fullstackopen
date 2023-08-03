import Notification from './components/Notification'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import {
  Routes, Route, Link,
} from 'react-router-dom'
import Users from './components/Users/Users'
import Blog from './components/Blog'
import { useNotification, useInitialization, useClearUser } from './hooks/index'
import { SmallButton, Page, Navigation } from './components/styles'
import User from './components/Users/User'

const App = () => {

  const stateInitializer = useInitialization()
  const notifyWith = useNotification()

  const clearUser = useClearUser()

  const user = useSelector(state => state.user)


  useEffect(() => {
    stateInitializer()
  }, [])

  const logout = async () => {
    clearUser()
    notifyWith('logged out')
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <Page>

      <Navigation>
        <span><strong>Blog app</strong></span>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/create">create new</Link>
        <span style={padding}>{user.name} logged in</span>
        <span style={padding}>
          <SmallButton onClick={logout}>logout</SmallButton>
        </span>
      </Navigation>

      <Notification />

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Page>
  )
}

export default App