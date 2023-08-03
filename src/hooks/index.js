import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotificationTime } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { initUser, clearUser } from '../reducers/userReducer'

export const useNotification = () => {
    const dispatch = useDispatch()

    return (message, type = 'info') => {
        dispatch(setNotificationTime(message, type))
    }
}

export const useInitialization = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        dispatch(initUser())
    }
}

export const useClearUser = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(clearUser())
    }
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}