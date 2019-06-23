import React from 'react';
import './Game.css';
import DevShop from './DevShop';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const startingAmount = 500

    this.state = {
      // Modifier for
      monetaryModifier: 1.0,
      // Total amount of money earned
      totalMoneyEarned: startingAmount,
      // Begin Shops
      javaScriptShop: this.setUpShop({
        key: 'javaScriptShop',
        name: 'JavaScript',
        moneyEarnedWithClick: 100,
        baseBuyAmount: startingAmount,
        buyIncreaseModifier: 0.1,
        buyTime: 500,
      }),
      rubyShop: this.setUpShop({
        key: 'rubyShop',
        name: 'Ruby',
        moneyEarnedWithClick: 5000,
        baseBuyAmount: 6000,
        buyIncreaseModifier: 0.3,
        buyTime: 1000,
      }),
      // End Shops
    };
  }

  setUpShop(props) {
    return (Object.assign({
      // the key for updating state
      key: '',
      // The name
      name: '',
      // The amount of shops
      numberOfShops: 0,
      // The money earned with each click
      moneyEarnedWithClick: 0,
      // The amount needed to buy a new shop
      baseBuyAmount: 0,
      // The modifier of how much the amount gos up to buy a new shop
      buyIncreaseModifier: 0.0,
      // Cooldown timer in MS before buying abother shop
      buyTime: 0,
      // Disables the earn button for cooldown
      earnButtonDisabled: false,
    }, props))
  }

  handleEarnClick(shopKey) {
    this.setState(prevState => {
      let shopProps = Object.assign({}, prevState[shopKey]);
      let newState = {};
      shopProps.earnButtonDisabled = true;
      newState[shopKey] = shopProps;
      return newState;
    });

    setTimeout(() => {
      this.setState(prevState => {
        let shopProps = Object.assign({}, prevState[shopKey]);
        let newState = {};
        shopProps.earnButtonDisabled = false;
        newState[shopKey] = shopProps;
        newState['totalMoneyEarned'] = prevState.totalMoneyEarned + ((shopProps.moneyEarnedWithClick * shopProps.numberOfShops) * this.state.monetaryModifier);
        return newState;
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
      newState['totalMoneyEarned'] = prevState.totalMoneyEarned - buyAmount
      return newState;
    });
  }

  canBuyNewShop(shopKey) {
    return this.state.totalMoneyEarned >= this.devShopBuyAmount(shopKey);
  }

  devShopBuyAmount(shopKey) {
    let shopProps = this.state[shopKey];
    if (shopProps.numberOfShops == 0) {
      return shopProps.baseBuyAmount
    } else {
      return (shopProps.baseBuyAmount * ((shopProps.numberOfShops) * shopProps.buyIncreaseModifier))
    }
  }

  centsToDollars(monetaryValue) {
    return monetaryValue / 100;
  }

  formatMoney(monetaryValue) {
    return '$' + this.centsToDollars(monetaryValue).toFixed(2);
  }

  renderShop(shopProps) {
    let buyAmount = this.formatMoney(this.devShopBuyAmount(shopProps.key));
    let moneyEarnedWithClick = this.formatMoney(shopProps.moneyEarnedWithClick * shopProps.numberOfShops);

    return (
      <DevShop
        key={shopProps.key}
        name={shopProps.name}
        numberOfShops={shopProps.numberOfShops}
        buyAmount={buyAmount}
        moneyEarnedWithClick={moneyEarnedWithClick}
        buyTime={shopProps.buyTime / 1000}
        earnButtonDisabled={shopProps.earnButtonDisabled}
        canBuyNewShop={this.canBuyNewShop(shopProps.key)}
        onEarnClick={() => this.handleEarnClick(shopProps.key)}
        onBuyClick={() => this.handleBuyClick(shopProps.key)}
      />
    );
  }

  render() {
    return (
      <div className="Game">
        <h2>Earned {this.formatMoney(this.state.totalMoneyEarned)}</h2>
        <div className="DevShop-container">
          {this.renderShop(this.state.javaScriptShop)}
          {this.renderShop(this.state.rubyShop)}
        </div>
      </div>
    );
  }
}

export default Game;
