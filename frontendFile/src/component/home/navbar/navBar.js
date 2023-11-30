// navBar.js
import React from "react";
import "./navBar.css";
import Logo from "../../../assets/images/anonymous_person.png";
import data from "./data";

const NavBar = ({ onSignInClick, onSignUpClick }) => {
  return (
    <section id="nav">
      <div className="container nav__container">
        <a href="index.html">
          <img src={Logo} alt="Logo" className="nav__logo" />
        </a>
        <ul className="nav__menu">
          {data.map((item) => (
            <li key={item.id}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
          <li className="nav__btn">
            <button className="btn sign__btn in" onClick={onSignInClick}>
              SignIn
            </button>
            <button className="btn sign__btn up" onClick={onSignUpClick}>
              SignUp
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default NavBar;
