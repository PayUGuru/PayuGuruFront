import React, { useState } from "react";
import './Header.css';
import { Stack, Toggle } from 'rsuite';
// import { ModeToggle } from './mode-toggle';
import 'rsuite/Toggle/styles/index.css';
import 'rsuite/Stack/styles/index.css';
import { Link, useNavigate } from "react-router-dom";
import {useTheme} from "./components/theme-context";



function Header(){
    const {theme, toggleTheme} = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

    return(
        <div>
            <header className={`h-theme ${theme} theme-controller`}>
                <div className="container">
                    <nav className="container-fluid navbar navbar-expand-lg">
                        <a className="navbar-brand" href="/">
                            { theme === "light" ? 
                            <img src="https://i.ibb.co/GTr3w2M/logo.webp" alt="logo" width="160" height="25"/>
                            :
                            <img src="https://i.ibb.co/ZzLf3bD/logo-footer.png"  alt="logo" width="160" height="25"/>
                            }
                        </a>
                        <div className="number ml-auto">
                            <Link className="btn-warning mr-sm-2 p-xy" to="/login">
                                Login
                            </Link>
                        </div>
                        <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav mx-auto">
                                {/* <li className="nav-item ">
                                    <a className="nav-link" className="smoothScroll" href="index.html">Home <span className="sr-only">(current)</span></a>
                                </li> */}
                                <li className="nav-item">
                                    <a className="nav-link smoothScroll" href="/#industries">Industries</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link smoothScroll" href="/#products">Products</a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link smoothScroll" href="/#pricing">Pricing</a>
                                </li>
                                {/* <li className="nav-item ">
                                    <a className="nav-link" className="smoothScroll" href="#">Blog</a>
                                </li> */}
                                <li className="nav-item">
                                    <a className="nav-link smoothScroll" href="/#support">Support</a>
                                </li>
                                <li className="nav-item my-auto items-center">
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
                                      className='sun-icon'
                                      >
                                      <circle cx="12" cy="12" r="5" />
                                      <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                    </svg>
                                </div>
                            </li>
                                <li className="nav-item my-auto items-center ">
                                <div className="mode-switch">
                                
                              
                                {/* <label className="flex cursor-pointer gap-2">
                              
                              <input
                                  type="checkbox"
                                  onChange={toggleMode}
                                  checked={theme === "dark"}
                                />
                                <span className="slider round"></span>
                              
                          </label>     */}
                                <Stack spacing={10} childrenRenderMode="clone">
                        {/* <Toggle size="lg">Large</Toggle>
                        <Toggle size="md">Medium</Toggle> */}
                              <Toggle size="sm"   onChange={toggleMode}
                                  checked={theme === "dark"}></Toggle>
                            </Stack>
                            
                              </div>
                                    
                            </li>
                            <li className="nav-item my-auto items-center">
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
                                  className='moon-icon'
                                  >
                                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            
                                </div>
                            </li>
                            </ul>
                            <div className="form-inline my-2">
                                <Link className="btn-warning mr-sm-2" to="/Login">Login</Link>
                            </div>
                        </div>
                    </nav>

                    {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Navbar w/ text</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#">Features</a>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link" href="#">Pricing</a>
                                </li>
                            </ul>
                            <span class="navbar-text">
                                Navbar text with an inline element
                            </span>
                            </div>
                        </div>
                    </nav> */}
                </div>
            </header>
        </div>
        
    )
}

export default Header;