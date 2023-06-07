const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        title: 'Mindfulness in Everyday Life',
        author: 'Emily Thompson',
        likes: 742,
    },
    {
        title: 'The Science Behind Sleep',
        author: 'Michael Anderson',
        likes: 312,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}