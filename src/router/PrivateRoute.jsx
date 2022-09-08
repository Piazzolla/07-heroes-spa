import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth"

//cuando recibe children (que es un jsx) es un higher order component
export const PrivateRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );
    return (logged) ? 
        children : <Navigate to="/login"/>
  
}
