import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

    return (
        <div>
            <h2>Users</h2>
            <ul>
                <li>Matti Luukkainen</li>
                <li>Juha Tauriainen</li>
                <li>Arto Hellas</li>
            </ul>
        </div>

    )

}

export default Users