const mongoose = require('mongoose')
require('dotenv').config()

const Blog = require('./models/blog')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

if (process.argv.length > 4) {
    const title = process.argv[2]
    const author = process.argv[3]
    const url = process.argv[4]
    const likes = process.argv[5]
    const blog = new Blog({
        title,
        author,
        url,
        likes
    })
    blog.save(() => {
        console.log(`added ${title}, author ${author} to blogList`)
        mongoose.connection.close()
    })
      
} else {
    Blog.find({})
        .then(result => {
            console.log('BlogList:')
            result.forEach(blog => {
                console.log(`${blog.title} ${blog.author}`)
            })
            mongoose.connection.close()
        })
        .catch(error => {
            console.error('Error retrieving entries:', error)
            mongoose.connection.close()
        })
}
