import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('render blog title and author but not Url or likes by default', () => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10
  }

  render(<Blog blog={blog}/>)

  const element = screen.getByText('Test Blog John Doe')
  expect(element).toBeDefined()

  expect(screen.queryByText('Url')).toBeNull()
  expect(screen.queryByText('Likes')).toBeNull()
})

test('blogs URL and likes are shown when the button controlling the shown details has been clicked', async() => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog}  toggleDetails={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.queryByText('Url')).toBeDefined()
  expect(screen.queryByText('Likes')).toBeDefined()
})

/*
test('clicking the like button calls the event handler the component received as props twice', async() => {
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 10
  }

  const mockHandleView = jest.fn()

  render(
    <Blog blog={blog} toggleDetails={mockHandleView} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const mockHandleLikes = jest.fn()

  render(
    <Blog blog={blog} handleLikes={mockHandleLikes}/>
  )

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLikes.mock.calls).toHaveLength(2)
}) */

test('<BlogForm /> updates state and calls onSubmit', async() => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const input = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('create')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})