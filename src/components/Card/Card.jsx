import React, { Component } from 'react';
import cx from 'classnames';
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp';
import Button from '../Button';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 311
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.upateHeight();
  }

  createRef = (r) => {
    this.ref = r;
    this.upateHeight();
  }

  upateHeight = () => {
    if (!this.ref) return;
    // const { width } = this.ref.getBoundingClientRect();
    // const height = width * 1.035;
    // this.setState({ height });
  }

  renderLocations = () => {
    const { locations } = this.props;

    if (!locations || !locations.length) return null;
    if (locations.length > 1) {
      return (
        <h3>Multiple Locations</h3>
      );
    }

    const [location] = locations;
    const { city, province } = location;

    return (
      <h3>{city}, {province}</h3>
    );
  }

  openCause = (id) => {
    const { openCause } = this.props;
    if (openCause) openCause(id);
  }

  render() {
    const { height } = this.state;
    const {
      name,
      organization,
      location,
      image_link: imageLink,
      dark,
      _id: id
    } = this.props;

    return (
      <div className={cx("xcard", {
        "xcard--dark": dark
      })}>
        <div
          ref={this.createRef}
          className="xcard__image"
          style={{
            height: `${height}px`,
            backgroundImage: `url('${imageLink}')`
            // backgroundImage: `url('/images/causes/Breakfast Drop-in Assistant.jpg')`
          }}
        >
          <Button
            caseSensitive
            secondary
            onClick={() => this.openCause(id)}
          >
            Learn More
          </Button>
        </div>
        <div className="xcard__info">
          <h1>{name}</h1>
          <h2>{organization}</h2>
          <div className="xcard__location">
            {/* <div className="xcard__location-icon" /> */}
            <IoLocationSharp
              size="20px"
              color={dark ? "white" : "#545454"}
            />
            {this.renderLocations()}
          </div>
        </div>
      </div>
    );
  }
}


export default Card;
