const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id).populate('user')

    response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    if (!(body.title || body.url)) {
        response.status(400).json({ error: 'Title of url are required' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
})


blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(403).json({ error: 'authorization required to delete' })
    }

})


blogsRouter.put('/:id', async (request, response) => {
    const { likes } = request.body

    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true })
    updatedBlog = await Blog.findById(updatedBlog._id).populate('user')
    response.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const { comment } = request.body
    const blog = await Blog.findById(request.params.id)

    blog.comments = blog.comments.concat(comment)
    await blog.save()

    response.json(blog)
})

module.exports = blogsRouter