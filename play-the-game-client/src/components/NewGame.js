import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

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
    this.props.newGame(this.state.playerName, this.props.history)
  }

  render(){
    return(
      <div className='NewGame'>
        <form onSubmit={this.handleSubmit}>
          <label> Player Name:
            <input 
              type='text' 
              value={this.state.playerName}
              onChange={this.handleChange}
            />
          </label>
          <br/>
          <br/>
          <input type='submit' value='Start New Game'/>
        </form>
      </div>
    )
  }
}

export default withRouter(NewGame);