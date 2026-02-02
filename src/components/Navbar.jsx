import "../styles/Navbar.css";
import logo from "../../public/icons/logo-B6.png"

function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="nav-left">
                    <img className="nav-logo" src={logo} alt="B6 Logo" />
                </div>

                <div className="nav-right">
                    <div className="social-icons">
                        <a 
                        href="https://www.linkedin.com/in/barath-b-37a909245/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                                     <a 
                        href="https://www.github.com/Barath6B"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        >
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div> 
        </>

    );
}

export default Navbar;