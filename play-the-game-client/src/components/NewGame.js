import React, {Component} from 'react';

class NewGame extends Component {
  constructor(props){
    super(props);
    this.state={
      playerName: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({playerName: event.target.value})
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

export default NewGame;