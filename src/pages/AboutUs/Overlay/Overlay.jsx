import React, { Component } from 'react'
import cx from 'classnames';

class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 500
    };
    
    this.api = {
      setContainerRef: this.setContainerRef
    }
  }

  componentDidMount() {
    const { createApi } = this.props;
    if (createApi) createApi(this.api);
  }

  setContainerRef = (ref) => {
    const { height } = ref.getBoundingClientRect();
    this.setState({ height });
  }

  render() {
    const { height } = this.state;

    return(
      <div
        className="overlay"
        style={{
          height: `${height}px`
        }}
      >

        <div className="overlay__ball overlay__ball--1" />
        <div className="overlay__ball overlay__ball--1-a" />
        <div className="overlay__ball overlay__ball--1-b" />

        <div className="overlay__ball overlay__ball--2" />
        <div className="overlay__ball overlay__ball--2-a" />
        <div className="overlay__ball overlay__ball--2-b" />

        <div className="overlay__ball overlay__ball--3" />
        <div className="overlay__ball overlay__ball--4" />

      </div>
    );
  }
}

export default Overlay;
