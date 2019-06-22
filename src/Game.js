import React from 'react';
import './Game.css';
import DevShop from './DevShop';

class Game extends React.Component {
  constructor(props) {
    super(props);
    var defaultShopProps = {
      // the key for updating state
      key: '',
      // The name
      name: '',
      // The amount of shops
      numberOfShops: 0,
      // The money earned with each click
      moneyEarned: 1.0,
      // The amount needed to buy a new shop
      buyAmount: 4.0,
      // The modifier of how much the amount gos up to buy a new shop
      buyIncreaseModifier: 1.1,
      // Cooldown timer in MS before buying abother shop
      buyTime: 500,
    };
    this.state = {
      // Modifier for
      monetaryModifier: 1,
      // All Shops
      shops: {
        javaScript: Object.assign(defaultShopProps, {
          key: 'javaScript',
          name: 'JavaScript',
          numberOfShops: 1,
        }),
      },
    };
  }

  renderShop(shopProps, intial = false) {
    return (
      <DevShop
        key={shopProps.key}
        name={shopProps.name}
        numberOfShops={shopProps.numberOfShops}
        moneyEarned={shopProps.moneyEarned}
        buyAmount={shopProps.buyAmount}
        buyIncreaseModifier={shopProps.buyIncreaseModifier}
        buyTime={shopProps.buyTime}
      />
    );
  }

  render() {
    return (
      <div className="Game">
        <div className="DevShop-container">
          {this.renderShop(this.state.shops.javaScript, true)}
        </div>
      </div>
    );
  }
}

export default Game;
