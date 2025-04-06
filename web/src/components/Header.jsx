import { Link } from 'react-router-dom';
import './Header.css';
import '../global.css';
import globesvg from '/globesvg.svg';

function Header({ handleLogout, isAuthenticated }) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-info">
                    <span className="header-tagline">
                        Formula 1 Circuit List
                    </span>
                    {isAuthenticated ?
                        <button onClick={handleLogout} className="button logout-button full-btn">Log Out</button>
                        :
                        <Link className="button login-button full-btn" to="/sign-in">Log In</Link>}
                </div>
            </div>
        </header>
    );
}

export default Header;
