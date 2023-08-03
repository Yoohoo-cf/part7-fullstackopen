import React, { useState } from 'react'
import { removeBlog, updateBlog, commentBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useNotification } from '../hooks/index'
import { SmallButton } from './styles'

const Blog = () => {

  const [comment, setComment] = useState('')

  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(u => u.id === id)

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const notifyWith = useNotification()
  const navigate = useNavigate()

  if (!blog || !user) {
    return null
  }

  const canRemove = blog.user.username === user.username

  const remove = () => {
    const ok = window.confirm(
      `Are you sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      dispatch(removeBlog(blog))
      notifyWith(`The blog' ${blog.title}' by '${blog.author} comment`)
      navigate('/')
    }
  }

  const like = () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlog(blogToUpdate))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const addComment = () => {
    dispatch(commentBlog(blog.id, comment))
    notifyWith('Comment added!')
    setComment('')
  }

  return (
    <div className='blog'>
      <div>
        <h3>{blog.title} by {blog.author}</h3>
      </div>

      <div>
        <a href={blog.url}> {blog.url}</a>{' '}
      </div>
      <div>
        {blog.likes} likes
        <button onClick={like}>like</button>
      </div>
      added by {blog.user && blog.user[0].name}
      <div className='remove'>
        {canRemove && <SmallButton onClick={remove}>delete</SmallButton>}

        <h3>comments: </h3>

        <input value={comment} onChange={({ target }) => setComment(target.value)} />
        <SmallButton onClick={addComment}>add comment</SmallButton>
      </div>
    </div >
  )
}

export default Blog