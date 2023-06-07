const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)      
})

blogsRouter.post('/', userExtractor, async(request, response) => {
    const body = request.body
 
    const user = request.user

    if (!(body.title || body.url)) {
        response.status(400).json({ error: 'Title of url are required'})
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

blogsRouter.delete('/:id', userExtractor, async(request, response) => {
    const blog = await Blog.findById(request.params.id)
   
    const user = request.user

    if(blog.user.toString() === user.id.toString() ){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end() 
    } else {
        return response.status(403).json({ error: 'authorization required to delete'})
    }
})
  

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    response.status(200).json(updatedNote)
})

module.exports = blogsRouter