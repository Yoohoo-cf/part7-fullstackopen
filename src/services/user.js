const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const getUser = () => {
    const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const clearUser = () => {
    window.localStorage.removeItem(STORAGE_KEY)
}

const getToken = () => {
    const user = getUser()
    return user ? user.token : null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    setUser,
    getUser,
    clearUser,
    getToken
}