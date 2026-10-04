import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "/logo.png";

function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="row">
          <div className="footer-header">
            <Link to="/" className="logo no-underline">
              <figure className="logo__img--wrapper">
                <img src={logo} alt="" className="logo__img" />
              </figure>
            </Link>
            <div className="footer-header__links">
              <Link to="/">Home</Link>
              <Link to="/" className="disabled-link">Contact</Link>
            </div>
            <div className="copyright">
              © 2026 Sebastian Giraldo. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
