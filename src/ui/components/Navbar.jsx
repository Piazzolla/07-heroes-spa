import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';


export const Navbar = () => {

    const { user, logout } = useContext( AuthContext );
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true //evita que cuanod haces back vuelvas a la pagina anterior
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={({ isActive }) => `nav-link nav-item ${isActive ? 'active' : ''}`}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `nav-link nav-item ${isActive ? 'active' : ''}`}
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-link nav-item ${isActive ? 'active' : ''}`}
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-info'>
                        { user?.name }
                    </span>

                    <button className='btn nav-item nav-link'
                        onClick={ onLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}