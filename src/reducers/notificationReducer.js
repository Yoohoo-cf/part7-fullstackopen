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
export default notificationSlice.reducer

export const setNotificationTime = (message, duration) => {
    return dispatch => {
        dispatch(setNotification({ message }))

        setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
    }
}