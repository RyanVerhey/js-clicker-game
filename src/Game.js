import React from 'react';
import './Game.css';
import DevShop from './DevShop';

class Game extends React.Component {
  constructor(props) {
    super(props);

    // All monetary values in cents
    let defaultShopProps = {
      // the key for updating state
      key: '',
      // The name
      name: '',
      // The amount of shops
      numberOfShops: 0,
      // The money earned with each click
      moneyEarnedWithClick: 100,
      // The amount needed to buy a new shop
      baseBuyAmount: 400,
      // The modifier of how much the amount gos up to buy a new shop
      buyIncreaseModifier: 1.1,
      // Cooldown timer in MS before buying abother shop
      buyTime: 500,
    };

    this.state = {
      // Modifier for
      monetaryModifier: 1.0,
      // Total amount of money earned
      totalMoneyEarned: 0,
      // Begin Shops
      javaScriptShop: Object.assign(defaultShopProps, {
        key: 'javaScriptShop',
        name: 'JavaScript',
        numberOfShops: 1,
      }),
      // End Shops
    };
  }

  handleEarnClick(shopKey) {
    setTimeout(() => {
      this.setState(prevState => {
        let shopProps = Object.assign({}, prevState[shopKey]);
        let currentMoneyEarned = this.state.totalMoneyEarned;
        let newMoneyEarned = currentMoneyEarned + ((shopProps.moneyEarnedWithClick * shopProps.numberOfShops) * this.state.monetaryModifier);
        return { totalMoneyEarned: newMoneyEarned }
      })
    }, this.state[shopKey].buyTime)
  }

  handleBuyClick(shopKey) {
    this.setState(prevState => {
      let shopProps = Object.assign({}, prevState[shopKey]);
      let newState = {};
      let buyAmount = this.devShopBuyAmount(shopKey);
      shopProps.numberOfShops++;
      newState[shopKey] = shopProps;
      newState['totalMoneyEarned'] = this.state.totalMoneyEarned - buyAmount
      return newState;
    });
  }

  canBuyNewShop(shopKey) {
    return this.state.totalMoneyEarned >= this.devShopBuyAmount(shopKey);
  }

  devShopBuyAmount(shopKey) {
    let shopProps = this.state[shopKey];
    if (shopProps.numberOfShops === 1) {
      return shopProps.baseBuyAmount;
    } else {
      return (shopProps.baseBuyAmount * ((shopProps.numberOfShops - 1) * shopProps.buyIncreaseModifier));
    }
  }

  centsToDollars(monetaryValue) {
    return (monetaryValue / 100).toFixed(2)
  }

  renderShop(shopProps, intial = false) {
    return (
      <DevShop
        key={shopProps.key}
        name={shopProps.name}
        numberOfShops={shopProps.numberOfShops}
        buyAmount={this.centsToDollars(this.devShopBuyAmount(shopProps.key))}
        moneyEarnedWithClick={this.centsToDollars(shopProps.moneyEarnedWithClick * shopProps.numberOfShops)}
        buyTime={shopProps.buyTime / 1000}
        canBuyNewShop={this.canBuyNewShop(shopProps.key)}
        onEarnClick={() => this.handleEarnClick(shopProps.key)}
        onBuyClick={() => this.handleBuyClick(shopProps.key)}
      />
    );
  }

  render() {
    return (
      <div className="Game">
        <h2>Earned ${this.centsToDollars(this.state.totalMoneyEarned)}</h2>
        <div className="DevShop-container">
          {this.renderShop(this.state.javaScriptShop, true)}
        </div>
      </div>
    );
  }
}

export default Game;
