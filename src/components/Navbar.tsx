import { Link } from 'react-router-dom';

// Navbar component for navigation links
export const Navbar = () => {
    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='container-fluid'>
                {/* Brand link to POS system */}
                <Link to={'/tasks'} className='navbar-brand'>
                    POS system
                </Link>
                {/* Right-aligned navigation links */}
                <div className='navbar-nav ml-auto'>
                    <li className='nav-item'>
                        {/* Home link */}
                        <Link to={'/home'} className='nav-link'>
                            Home
                        </Link>
                    </li>
                </div>
                {/* Left-aligned navigation links */}
                <div className='navbar-nav'>
                    <li className='nav-item'>
                        {/* Orders link */}
                        <Link to={'/orders'} className='nav-link'>
                            Orders
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    )
}
