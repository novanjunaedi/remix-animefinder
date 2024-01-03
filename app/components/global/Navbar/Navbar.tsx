import { NavLink, useNavigate } from "@remix-run/react";
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
            <div className="container">
                <NavLink className="navbar-brand fw-bolder" to="/">Anime Finder</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/request">Request</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                    </ul>

                    <form onSubmit={(e) => { e.preventDefault(); navigate(`/animes/search/${query.toLocaleLowerCase()}`) }} className="d-flex ms-lg-3" role="search">
                        <input onChange={(e) => setQuery(e.target.value)} value={query} className="form-control me-2" type="search" placeholder="Search anime..." aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
