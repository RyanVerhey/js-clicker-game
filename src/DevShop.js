import React from 'react';
import './DevShop.css';

function DevShop(props) {
  if (props.numberOfShops > 0) {
    return (
      <div className="DevShop">
        <h3>{props.name}</h3>
        <p>You have {props.numberOfShops} {props.name} dev shop(s)</p>
        <button
          className="DevShop-earn-button"
          onClick={props.onEarnClick}
        >
          Earn {props.moneyEarnedWithClick}! ({props.buyTime} seconds)
        </button><br />
        <button
          className="DevShop-buy-button"
          onClick={props.onBuyClick}
          disabled={!props.canBuyNewShop}
        >
          Buy another {props.name} Dev Shop for {props.buyAmount}!
        </button>
        <hr />
      </div>
    );
  } else {
    return (
      <div className="DevShop">
        <h3>{props.name}</h3>
        <button
          className="DevShop-buy-button"
          onClick={props.onBuyClick}
          disabled={!props.canBuyNewShop}
        >
          Buy your first {props.name} Dev Shop for {props.buyAmount}!
        </button>
      </div>
    );
  }
}

export default DevShop;
