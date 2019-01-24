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
    // binding makes 'this' refer to the correct thing in the callback
    // In JS, methods are not bound by default. 
    // If you forget to bind your event handler, 
    // 'this' will be undefined when the function is actually called. 
    // If you don't want to bind, you could
    // 1) use public class fields syntax 
      // handleChange = (event) => {
      //   this.setState({playerName: event.target.value})
      // }
      // OR
    // 2) use an arrow function callback
      // handleChange(event){
      //   this.setState({playerName: event.target.value})
      // }
      // ...
      // onChange={(event)=>this.handleChange(event)}
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