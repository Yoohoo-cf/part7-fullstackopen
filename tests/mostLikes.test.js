const listHelper = require('../utils/list_helper')

describe('most likes', ()=>{

    const listWithOneBlog1 = [
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }
    ]

    const listWithOneBlog2 = 
        {
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }

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
        author: 'Edsger W. Dijkstra',
        likes: 17,
    }

    const listWithZeroBlog1 = []

    test('when list has only one blog, the most liked is the one', () => {
        const result = listHelper.mostLikes(listWithOneBlog1)
        expect(result).toEqual(listWithOneBlog2)
    })

    test('when list has many blogs, the most likes is the author whose blogs has the total most likes', () => {
        const result = listHelper.mostLikes(listWithManyBlogs1)
        expect(result).toEqual(listWithManyBlogs2)
    })

    test('should return undefined for an empty list of blogs', () => {
        const result = listHelper.mostLikes(listWithZeroBlog1)
        expect(result).toBeUndefined
    })

})