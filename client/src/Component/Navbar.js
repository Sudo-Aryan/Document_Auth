import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import { Link } from "react-router-dom";




const Navbar = () => {
    return (
      <>
        <nav
          className="navbar bg-dark border-bottom border-body navbar"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              
              {/* LOGO */}
            </a>
            {/* /* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}

            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a class="nav-link active" href=""><Link to="/Home" style={{ color: "white", textDecoration: "none" }}>Home</Link></a>
                
              </li>
              <li class="nav-item">
              
                <a class="nav-link" href="#">
                {" "}
                  <Link to="/About" style={{ color: "white", textDecoration: "none" }}>
  About Us
</Link>
                </a> 
              </li>
              <li class="nav-item">
                <a class="nav-link ">
                  {" "}
                  <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
 Signin
</Link>
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Signup
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      <Link to="register/issuer" style={{ color: "black" }}>
                        Issuer
                      </Link>
                    </a>
                  </li>
                  <li>
                    <hr
                      class="dropdown-divider"
                      style={{ backgroundColor: "black", height: "2px" }}
                    />
                  </li>
                  <li>
                    <a class="dropdown-item " href="#">
                      <Link to="/register/verifier" style={{ color: "black" }}>
                        Verifier
                      </Link>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
}
export default Navbar