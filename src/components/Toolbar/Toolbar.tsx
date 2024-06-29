import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary mb-3">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Quotes Central
                </NavLink>
                <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
                    <li className="nav-item me-2">
                        <NavLink
                            to="/"
                            className="nav-link"
                        >
                            Quotes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/add-quote"
                            className="nav-link"
                        >
                            submit new quote
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;