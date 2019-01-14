import React, {Component} from 'react'

class Background extends Component {
  render(){
    return (
      <img src={process.env.PUBLIC_URL + '/rawpixel-604757-unsplash.jpg'} alt="background" />
    )
  }
}

export default Background