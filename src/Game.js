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
      let devShop = Object.assign({}, prevState[shopKey]);
      let newState = {};
      devShop.earnButtonDisabled = true;
      newState[shopKey] = devShop;
      return newState;
    });

    setTimeout(() => {
      this.setState(prevState => {
        let devShop = Object.assign({}, prevState[shopKey]);
        let newState = {};
        devShop.earnButtonDisabled = false;
        newState[shopKey] = devShop;
        newState['totalMoneyEarned'] = prevState.totalMoneyEarned + this.moneyEarnedWithClick(shopKey, prevState);
        return newState;
      })
    }, this.state[shopKey].buyTime)
  }

  handleBuyClick(shopKey) {
    this.setState(prevState => {
      let devShop = Object.assign({}, prevState[shopKey]);
      let newState = {};
      let buyAmount = this.devShopBuyAmount(shopKey);
      devShop.numberOfShops++;
      newState[shopKey] = devShop;
      newState['totalMoneyEarned'] = prevState.totalMoneyEarned - buyAmount
      return newState;
    });
  }

  moneyEarnedWithClick(shopKey, state = this.state) {
    let devShop = state[shopKey];
    return ((devShop.moneyEarnedWithClick * devShop.numberOfShops) * state.monetaryModifier)
  }

  canBuyNewShop(shopKey) {
    return this.state.totalMoneyEarned >= this.devShopBuyAmount(shopKey);
  }

  devShopBuyAmount(shopKey) {
    let devShop = this.state[shopKey];
    if (devShop.numberOfShops === 0) {
      return devShop.baseBuyAmount;
    } else {
      return (devShop.baseBuyAmount + (devShop.baseBuyAmount * (devShop.numberOfShops * devShop.buyIncreaseModifier)));
    }
  }

  centsToDollars(monetaryValue) {
    return monetaryValue / 100;
  }

  formatMoney(monetaryValue) {
    return '$' + this.centsToDollars(monetaryValue).toFixed(2);
  }

  renderShop(devShop) {
    let buyAmount = this.formatMoney(this.devShopBuyAmount(devShop.key));
    let moneyEarnedWithClick = this.formatMoney(this.moneyEarnedWithClick(devShop.key));

    return (
      <DevShop
        key={devShop.key}
        name={devShop.name}
        numberOfShops={devShop.numberOfShops}
        buyAmount={buyAmount}
        moneyEarnedWithClick={moneyEarnedWithClick}
        buyTime={devShop.buyTime / 1000}
        earnButtonDisabled={devShop.earnButtonDisabled}
        canBuyNewShop={this.canBuyNewShop(devShop.key)}
        onEarnClick={() => this.handleEarnClick(devShop.key)}
        onBuyClick={() => this.handleBuyClick(devShop.key)}
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
