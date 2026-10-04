import React, { useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef(null);

  function goToSearch() {
    const query = searchInputRef.current.value;
    if (query) {
      navigate(`/results?search_query=${query}`);
    }
  }

  return (
    <>
      <div>
        <div className="navbar-container">
          <div className="row">
            <div className="nav-header">
              <Link to="/" className="logo no-underline">
                <figure className="logo__img--wrapper">
                  <img src={logo} alt="" className="logo__img" />
                </figure>
                <span className="logo__text">
                  eb<span className="text--accent">flix</span>
                </span>
              </Link>
              <div className="nav-header__links">
                <Link to="/">Home</Link>
                <Link to="/" className="disabled-link">Favorites</Link>
                <button className="nav-header__links--btn disabled-link">Contact</button>
              </div>
            </div>
            <div className="nav-footer">
              <h3>Browse Movies</h3>
              <div className="nav-footer__input--wrapper">
                <input
                  type="text"
                  placeholder="Search by Title"
                  className="nav-footer__input"
                  ref={searchInputRef}
                  onKeyDown={(event) => {
                    event.key === "Enter" && goToSearch();
                  }}
                />
                <FontAwesomeIcon
                  className="nav-footer__input--icon"
                  icon={faMagnifyingGlass}
                  onClick={goToSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
