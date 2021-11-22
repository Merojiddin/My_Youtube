import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Wrapper from "../styles/Navbar";
import GoogleAuth from "./GoogleAuth";
import { AppsIcon, HamburgerIcon, LogoIcon, SettingsIcon } from "./Icons";
import Search from "./Search";
import UserDropdown from "./UserDropdown";

function Navbar({ toggleSidebarOpen }) {
  const user = useAuth()
  return (
    <Wrapper >
      <div className="logo flex-row">
        <HamburgerIcon className="toggle-navhandler" onClick={toggleSidebarOpen} />
        <span>
          {/* <Link to="/">  */}
          <NavLink to="/">
            <LogoIcon
              style={{
                width: 80,
                height: 24,
              }}
            />
          </NavLink>
          {/* </Link> */}
        </span>
      </div>

      <Search />

      <ul>
        <li>
          <AppsIcon />
        </li>
        <li>
          <SettingsIcon />
        </li>
        <li>
          {user ? <UserDropdown user={user} /> : <GoogleAuth />}
        </li>
      </ul>
    </Wrapper>
  );
}

export default Navbar;
