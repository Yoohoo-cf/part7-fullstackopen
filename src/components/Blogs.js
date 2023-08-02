import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {

    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <Table striped>
                <tbody>
                    {
                        sortedBlogs.map((blog) => (
                            <tr key={blog.id}>
                                <td>
                                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Blogs