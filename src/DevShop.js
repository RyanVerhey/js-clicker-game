import React from 'react';
import './DevShop.css';

function DevShop(props) {
  return (
    <div className="DevShop">
      <h3>{props.name}</h3>
      <p>You have {props.numberOfShops} {props.name} dev shop(s)</p>
      <button
        className="DevShop-earn-button"
        onClick={props.onEarnClick}
      >
        Earn ${props.moneyEarned}! ({props.buyTime / 1000} seconds)
      </button><br />
      <button
        className="DevShop-buy-button"
        onClick={() => alert("Was Clicked")}
      >
        Buy another {props.name} Dev Shop!
      </button>
      <hr />
    </div>
  );
}

export default DevShop;
