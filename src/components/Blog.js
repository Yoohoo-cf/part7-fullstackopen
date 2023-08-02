import React from 'react'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const { id } = useParams()

  console.log("URL ID:", id)

  const blog = blogs.find(b => b.id === Number(id))

  const dispatch = useDispatch()
  console.log("Found Blog:", blog)

  return (
    <div style={blogStyle} className='blog'>
      <div className='details'>
        <h3>{blog.title} {blog.author}</h3>
        <Link>{blog.url}</Link>
        <div>
          {blog.likes} likes
          <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
        </div>
        added by {blog.user[0].name}
        <div className='remove'>
          {blog.user && blog.user.length > 0 && (
            <button onClick={() => dispatch(removeBlog(blog.id))} style={{
              backgroundColor: '#4285F4', color: 'white',
              padding: '4px 9px', border: 'none', borderRadius: '4px'
            }}>
              remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog