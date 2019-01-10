import React, {Component} from 'react';

class NewGame extends Component {
  constructor(props){
    super(props);
    this.state={
      playerName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({playerName: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    // some code submitting the form to games#create
    // dispatching setGame with returned new game info
    // redirecting to new game's show page 
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label> Player Name:
          <input 
            type='text' 
            value={this.state.playerName}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Start New Game'/>
      </form>
    )
  }
}

export default NewGame;