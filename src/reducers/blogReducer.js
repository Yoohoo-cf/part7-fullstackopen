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
        alter(state, { payload }) {
            return state.map(s => s.id !== payload.id ? s : payload)
        },
    }
}
)

export const { appendBlog, setBlogs, setSingleBlog, deleteBlogOf, alter } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
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

export const updateBlog = (object) => {
    return async dispatch => {
        const data = await blogService.update(object)
        dispatch(alter(data))
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        const data = await blogService.comment(id, comment)
        dispatch(alter(data))
    }
}

export default blogSlice.reducer