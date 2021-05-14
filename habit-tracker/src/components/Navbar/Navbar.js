import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-xl navbar-light App-NavMenu">
        <h1 className="navbar-brand">Habit Tracker</h1>
        <ul className="navbar-nav mr-auto">
          <li>
            <Link to="#"></Link>
          </li>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
