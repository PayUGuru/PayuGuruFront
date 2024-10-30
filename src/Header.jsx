import React, { useState } from "react";
import "./Header.css";
import { Stack, Toggle } from "rsuite";
// import { ModeToggle } from './mode-toggle';
import "rsuite/Toggle/styles/index.css";
import "rsuite/Stack/styles/index.css";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./components/theme-context";

function Header() {
  const { theme, toggleTheme } = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

  return (
    <div>
      <header className={`h-theme ${theme} theme-controller`}>
        <div className="container">
          <nav className="container-fluid navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              {theme === "light" ? (
                <img
                  src="https://i.ibb.co/GTr3w2M/logo.webp"
                  alt="logo"
                  width="160"
                  height="25"
                />
              ) : (
                <img
                  src="https://i.ibb.co/ZzLf3bD/logo-footer.png"
                  alt="logo"
                  width="160"
                  height="25"
                />
              )}
            </a>
            <div className="number ml-auto d-none">
              <Link className="btn-warning mr-sm-2 p-xy" to="/login">
                Login
              </Link>
            </div>
            <button
              type="button"
              data-target="#navbarCollapse"
              data-toggle="collapse"
              className="navbar-toggler"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mx-auto">
                {/* <li className="nav-item ">
                                    <a className="nav-link" className="smoothScroll" href="index.html">Home <span className="sr-only">(current)</span></a>
                                </li> */}
                <li className="nav-item">
                  <a className="nav-link smoothScroll" href="/#industries">
                    Industries
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link smoothScroll" href="/#products">
                    Products
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link smoothScroll" href="/#pricing">
                    Pricing
                  </a>
                </li>
                {/* <li className="nav-item ">
                                    <a className="nav-link" className="smoothScroll" href="#">Blog</a>
                                </li> */}
                <li className="nav-item">
                  <a className="nav-link smoothScroll" href="/#support">
                    Support
                  </a>
                </li>
                
                <li className="nav-item my-auto">
                    <div className="customThemeToggle">
                        <div>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="sun-icon"
                            >
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                        </div>
                        <div className="mode-switch">
                            <Stack spacing={10} childrenRenderMode="clone">
                                <Toggle
                                    size="sm"
                                    onChange={toggleMode}
                                    checked={theme === "dark"}
                                ></Toggle>
                            </Stack>
                        </div>
                        <div>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="moon-icon"
                            >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </div>
                    </div>

                </li>
                <li className="nav-item d-lg-none d-sm-block my-3">
                    <div className="d-flex justify-content-start">
                        <Link className="btn-warning mr-sm-2 px-3 py-1" to="/Login">
                        Login
                        </Link>
                    </div>
                </li>
               
              </ul>
              <div className="form-inline my-2 d-sm-block d-lg-block">
                <Link className="btn-warning mr-sm-2" to="/Login">
                  Login
                </Link>
              </div>
            </div>
          </nav>

          
        </div>
      </header>
    </div>
  );
}

export default Header;
