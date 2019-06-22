import React from 'react';
import './Game.css';
import DevShop from './DevShop';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Game">
        <div className="DevShop-container">
          <DevShop title="Shop 1"/>
          <DevShop title="Shop 2"/>
        </div>
      </div>
    );
  }
}

export default Game;
