import { useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth"

//cuando recibe children (que es un jsx) es un higher order component
export const PrivateRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );

    const { pathname, search } = useLocation();
    const lastPath = pathname + search;

   useEffect(() => {
        localStorage.setItem('lastPath', lastPath);
   }, [pathname, search])
    
    return (logged) ? 
        children : <Navigate to="/login"/>
  
}
