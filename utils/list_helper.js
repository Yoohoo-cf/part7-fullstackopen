const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + (blog.likes)
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    
    let maxLikes = blogs[0].likes
    let favorite = blogs[0]

    for(let i = 1; i < blogs.length; i++){
        if (blogs[i].likes > maxLikes) {
            maxLikes = blogs[i].likes
            favorite = blogs[i]
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    const authorCounts = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])
    
    return { author: topAuthor, blogs: authorCounts[topAuthor]}

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }

    const authorLikes = _.reduce(
        blogs,
        (result, blog) => {
            const author = blog.author
            const likes = blog.likes
            result[author] = (result[author] || 0) + likes
            return result
        },
        {}
    )

    const topAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])

    return { author: topAuthor, likes: authorLikes[topAuthor]}
}

module.exports ={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}