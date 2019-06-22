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
        Earn ${props.moneyEarned * props.numberOfShops}! ({props.buyTime / 1000} seconds)
      </button><br />
      <button
        className="DevShop-buy-button"
        onClick={props.onBuyClick}
        disabled={!props.canBuyNewShop}
      >
        Buy another {props.name} Dev Shop for ${props.buyAmount}!
      </button>
      <hr />
    </div>
  );
}

export default DevShop;
