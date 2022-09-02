import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.css";
import NavbarMatrial from "./navbarMetrial";
const Header = () => {
  return (
    <div>
      <header className={style.header} >
        <NavbarMatrial  />
      </header>
    </div>
  );
};

export default Header;
