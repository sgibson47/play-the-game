import React, {Component} from 'react';

class NewGameForm extends Component {
  constructor(props){
    super(props);
    this.state={
      playerName: ''
    };
  }

  render(){
    return(
      <form>
        <label> Player Name:
          <input 
            type='text' 
            value={this.state.playerName}
          />
        </label>
        <input type='submit' value='Start New Game'/>
      </form>
    )
  }
}