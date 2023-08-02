import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        deleteBlogOf(state, action) {
            const id = action.payload
            return state.filter(blog =>
                blog.id !== id)
        },
        likeBlogOf(state, action) {
            const id = action.payload
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : likedBlog)
        },
        setSingleBlog(state, action) {
            const id = action.payload
            return state.find(blog =>
                blog.id === id)
        }
    }
})

export const { appendBlog, setBlogs, setSingleBlog, deleteBlogOf, likeBlogOf } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const singleBlog = (id) => {
    return async dispatch => {
        const blog = await blogService.getSingle(id)
        dispatch(setSingleBlog(blog))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(newBlog)
        dispatch(appendBlog(createdBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlogOf(id))
    }
}

export const likeBlog = (id, updatedObject) => {
    return async dispatch => {
        await blogService.update(id)
        dispatch(likeBlogOf(id))
    }
}

export default blogSlice.reducer