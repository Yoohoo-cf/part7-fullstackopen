const listHelper = require('../utils/list_helper')

describe('author has most blogs', () => {
    const listWithManyBlogs1 = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        },
        {
            title: 'First class tests',
            author: 'Robert C. Martin',
            likes: 10,
        },
        {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            likes: 0,
        },
        {
            title: 'Type wars',
            author: 'Robert C. Martin',
            likes: 2,
        }  
    ]

    const listWithManyBlogs2 = {
        author: 'Robert C. Martin',
        blogs: 3
    }

    const listWithZeroBlog1 = []

    const listWithOneBlog1 = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const listWithOneBlog2 = {
        author: 'Edsger W. Dijkstra',
        blogs: 1
    }

    test('when list has many blogs, mostBlogs is the author who has the most blogs in the list', () => {
        const result = listHelper.mostBlogs(listWithManyBlogs1)
        expect(result).toEqual(listWithManyBlogs2)
    }) 

    test('should return undefined for an empty list of blogs', () => {
        const result = listHelper.mostBlogs(listWithZeroBlog1)
        expect(result).toBeUndefined
    })

    test('For one blog list, the author who has the most blogs is the one author and the blogs will be 1', () => {
        const result = listHelper.mostBlogs(listWithOneBlog1)
        expect(result).toEqual(listWithOneBlog2)
    })

})