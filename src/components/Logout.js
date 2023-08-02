import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../reducers/userReducer"

const Logout = () => {


    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()

        dispatch(logout())
    }


    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout