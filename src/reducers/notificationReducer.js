import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload.message
        },
        clearNotification: () => ''
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationTime = (message, type = "success") => {
    return async dispatch => {
        dispatch(setNotification({ message }))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer