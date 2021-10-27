import React from "react";
import "../styles/NavBar.css"
import { Link }from "react-router-dom"

import cartImage from "../images/cart-icon.png"

function NavBar(props) {

    const {purchaseCounter} = props

    return (
      <div>
        <div className="navbar">
            <h3>Shopping Cart App</h3>
            <ul className="nav-links">
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/shop">
                <li>Shop</li>
                </Link>
                <Link to="/cart">
                <div className="cart-nav">
                  <img src={cartImage} alt="shopping cart icon"/>
                  <li>Cart ({purchaseCounter})</li>
                </div>
                </Link>
            </ul>
        </div>
      </div>
    );
  }

export default NavBar;