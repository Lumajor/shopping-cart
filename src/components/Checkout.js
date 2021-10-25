import React from "react";

function Checkout(props) {

    const { item: { count, text, price } } = props;

    return (
      <div>
        <li>{text} x {count} : ${count * price}</li>
      </div>
    );
  }
  
  export default Checkout;