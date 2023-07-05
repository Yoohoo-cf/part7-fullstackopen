import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)
  const [updatedBlog, setUpdatedBlog] = useState(blog)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLikes = () => {

    const updatedLikes = updatedBlog.likes + 1

    blogService
      .update(blog.id,  { ...updatedBlog, likes: updatedLikes })
      .then((returnedBlog) => {
        setUpdatedBlog(returnedBlog)
      })
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='main-page'>
        {blog.title} {blog.author}
        <button id='view' onClick={toggleDetails}>{detailsVisible? 'hide' : 'view'}</button>
      </div>

      {detailsVisible && (
        <div className='details'>
          <ul>
            <li>Title: {blog.title}</li>
            <li>Url: {blog.url}</li>
            <li>
              Likes: {updatedBlog.likes}
              <button id='like' onClick={handleLikes}>like</button>
            </li>

            { blog.user && blog.user.length > 0 &&  (
              <li>User: {blog.user[0].name}</li>
            )}

            <div className='remove'>
              { blog.user && blog.user.length > 0 && (
                <button onClick={setDelete} style ={{ backgroundColor: '#4285F4', color: 'white',
                  padding: '4px 9px', border: 'none', borderRadius: '4px' }}>
              remove
                </button>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  )}

export default Blog