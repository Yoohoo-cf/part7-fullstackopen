import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import setNotificationTime from './notificationReducer'
import storageService from '../services/storage'

const userSlice = createSlice({

    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clear(state, action) {
            return null
        }
    }
})

export const { setUser, clear } = userSlice.actions


export const loginUser = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            storageService.saveUser(user)
            dispatch(setUser(user))
            dispatch(setNotificationTime('welcome'))
        } catch (e) {
            dispatch(setNotificationTime('wrong name or password', 'error'))
        }
    }
}

export const initUser = () => {
    return async dispatch => {
        const user = storageService.loadUser()
        dispatch(setUser(user))
    }
}

export const clearUser = () => {
    return async dispatch => {
        storageService.removeUser()
        dispatch(clear())
    }
}


export default userSlice.reducer