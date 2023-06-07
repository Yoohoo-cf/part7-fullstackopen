const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

let token

beforeEach(async () => {
    const response = await api
        .post('/api/login')
        .send({ username: 'mluukkai', password: 'salainen' })
    token = response.body.token
})


describe('when there is initially some blogs saved', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('all blogs have id property', async () => {
        const response = await api.get('/api/blogs')
        
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('adding a blog', () => {
    
    test('a valid blog can be added', async () => {

        const newBlog = {
            title: 'Tech Talk: Unraveling the Latest Gadgets',
            author: 'Alex Thompson',
            url: 'https://www.exampleblog.com/tech-talk-latest-gadgets',
            likes: 415,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': `Bearer ${token}`})
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        console.log('Blogs:', blogsAtEnd)

        expect (blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'Tech Talk: Unraveling the Latest Gadgets'
        )
    })

    test('likes will default to 0 if it is missing', async() => {
        const newBlog = {
            title: 'The Art of Minimalism',
            author: 'Sarah Johnson',
            url: 'https://www.exampleblog.com/minimalism-art'
        }

        await api
            .post('/api/blogs')
            .set({ 'Authorization': `Bearer ${token}`})
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const allLikes = blogsAtEnd.map(b => b.likes)
        expect(allLikes).toContain(0)
    })

    test('fails with status code 400 if the title or url missing', async() => {
        const newBlog1 = {
            title: 'The Art of Minimalism',
            author: 'Sarah Johnson',
        }

        const newBlog2 = {
            author: 'Sarah Johnson',
            url: 'https://www.exampleblog.com/minimalism-art'
        }

        await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
    })
})

describe ('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const loginResponse = await api
            .post('/api/login')
            .send({ username: 'mluukkai', password: 'salainen' })

        const token = loginResponse.body.token

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ 'Authorization': `Bearer ${token}` })
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating the information of an individual blog post', () => {
    test('updating likes for a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updatedBlogData = {
            ...blogToUpdate,
            likes: blogToUpdate.likes + 1,
        }

        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(200)
        expect(response.body.likes).toEqual(updatedBlogData.likes)
        
        const blogsAtEnd = await helper.blogsInDb()
        const blogAfterUpdate = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)
        expect(blogAfterUpdate.likes).not.toEqual(blogToUpdate.likes)

    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()

    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            /*.set({ Authorization: `Bearer ${token}`}) */
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})