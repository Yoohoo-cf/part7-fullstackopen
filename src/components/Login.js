import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotificationTime } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Form, Table, Button } from 'react-bootstrap'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON =
            window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotificationTime('wrong crendicials', 5000))
        }
    }

    return (
        <div>
            <h2>Log in to bloglist website!</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>username: </Form.Label>
                    <Form.Control type="text" value={username} name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />

                    <Form.Label>password: </Form.Label>
                    <Form.Control type="password" value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Button variant="primary" type="submit">login</Button>
                </Form.Group>
            </Form >
        </div>
    )
}


export default Login