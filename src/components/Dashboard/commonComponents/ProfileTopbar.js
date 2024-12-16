import React, {useState} from "react";
import { Link , useLocation  } from "react-router-dom";
import { Tabs, Switch, TextInput, Button } from '@mantine/core';
import { User, Building2, Webhook, Terminal, Cable } from 'lucide-react';
const ProfileTopbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="col-12 mt-3">
      <Link
        to="/userprofile"
        className={`btn btn1 virtual-btn ${activeLink === "/userprofile" ? "active" : ""}`}
        onClick={() => handleLinkClick("/userprofile")}
      >
       <User size={16}/> Profile
      </Link>
      <Link to="/account" className={`btn btn1 virtual-btn ${activeLink === "/account" ? "active" : ""}`}
        onClick={() => handleLinkClick("/account")}>
       <Building2 size={16}/> Account
      </Link>
      <Link to="/api" type="button" className={`btn btn1 virtual-btn ${activeLink === "/api" ? "active" : ""}`}
        onClick={() => handleLinkClick("/api")}>
        <Cable size={16}/> API
      </Link>
      <Link to="/webhook" type="button" className={`btn btn1 virtual-btn ${activeLink === "/webhook" ? "active" : ""}`}
        onClick={() => handleLinkClick("/webhook")}>
       <Webhook size={16}/> Webhooks
      </Link>
      <Link to="/SystemInfo" type="button" className={`btn btn1 virtual-btn ${activeLink === "/SystemInfo" ? "active" : ""}`}
        onClick={() => handleLinkClick("/SystemInfo")}>
       <Terminal size={16}/> SystemInfo
      </Link>
      
      
    </div>
  );
};

export default ProfileTopbar;
