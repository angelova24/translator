import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

const withAuth = Component => props => {
    const {user} = useUser()
    if (user !== null) {
        return <Component {...props}/>
    } else { //if user is not logged in redirect to start page
        return <Navigate to="/" />
    }
}

export default withAuth