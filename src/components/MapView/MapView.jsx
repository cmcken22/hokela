import React, { Component } from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import './map-view.scss';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const { causes } = this.props;
    const { causes: prevCauses } = prevProps;

    if (isEqual(causes, prevCauses)) {
      this.createMarkers();
    }
  }

  createRef = async (r) => {
    this.ref = r;
    const toronto = await this.getLocation('Toronto, ON');
    this.map = new google.maps.Map(this.ref, {
      zoom: 8,
      center: toronto,
    });
    this.createMarkers();
  }

  getLocation = (location) => {
    return new Promise(resolve => {
      var geocoder =  new google.maps.Geocoder();
      geocoder.geocode({ 'address': location }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          return resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          })
        } else {
          // default to Toronto
          return resolve({
            lat: 43.653226,
            lng: -79.3831843
          })
        }
      });
    })
  }

  createMarkers = () => {
    const { causes } = this.props;
    if (!causes || causes.size === 0 || !this.map) return;

    causes.entrySeq().forEach(async ([id, cause]) => {
      const { location } = cause.toJS();
      if (location.toLowerCase() !== 'remote') {
        const x = await this.getLocation(location);
        new google.maps.Marker({
          position: x,
          map: this.map,
        });
      }
    });
  }

  render() {
    return (
      <div
        id="map"
        className="map"
        ref={this.createRef}
      >
        
      </div>
    );
  }
}


export default MapView;
