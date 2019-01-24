import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class GameLink extends Component {
  constructor(props){
    super(props);
    this.state = {count: 0}
  }


  clickHandler = () =>{
    this.setState({count: this.state.count+1})
  }

  render(){
    return (
      <div>
        <Link to={`/games/${this.props.game.id}`}>
          {`${this.props.game.playerName}'s game`}
        </Link>
        <button onClick={this.clickHandler}>Vote</button>
        <div>{this.state.count}</div>
      </div>
    );
  }
};

export default GameLink;