import React, { Component } from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import './map-view.scss';

const google = window.google;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.markers = {};
    this.locations = {};
  }

  componentDidUpdate(prevProps) {
    const { causes } = this.props;
    const { causes: prevCauses } = prevProps;

    if (!isEqual(causes, prevCauses)) {
      this.createMarkers();
    }
  }

  createRef = async (r) => {
    this.ref = r;
    const toronto = await this.getLocation('Toronto, ON, Canada');
    this.map = new google.maps.Map(this.ref, {
      zoom: 8,
      center: toronto,
    });
    this.createMarkers();
  }

  getLocation = (location) => {
    return new Promise(resolve => {

      if (!!this.locations[location]) {
        return resolve(this.locations[location]);
      }

      var geocoder =  new google.maps.Geocoder();
      geocoder.geocode({ 'address': location }, (results, status) => {
        console.log(location, status);
        if (status == google.maps.GeocoderStatus.OK) {
          const res = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          this.locations[location] = res;
          return resolve(res);
        } 
        // else {
        //   // default to Toronto
        //   this.locations[location] = res;
        //   const res = {
        //     lat: 43.653226,
        //     lng: -79.3831843
        //   };
        //   return resolve(res);
        // }
        return resolve(false);
      });
    })
  }

  clearMarkers = () => {
    return new Promise(resolve => {
      console.clear();
      for (let key in this.markers) {
        const marker = this.markers[key];
        marker.setMap(null);
      }
      return resolve();
    });
  }

  createMarkers = async () => {
    const { causes } = this.props;

    await this.clearMarkers();

    if (!causes || causes.size === 0 || !this.map) return;
    const causesJS = causes.toJS();

    for (let key in causesJS) {
      const cause = causesJS[key];
      const { locations } = cause;

      for (let i = 0; i < locations.length; i++) {
        const location = locations[i];
        const { city, province, country } = location;
        const string = `${city}${province ? `, ${province}` : ''}${country ? `, ${country}` : ''}`;
        if (city && city.toLowerCase() === 'remote') continue;

        if (!this.markers[string]) {
          const x = await this.getLocation(string);
          if (x) {
            this.markers[string] = new google.maps.Marker({
              position: x,
              map: this.map
            });
          }
        } else {
          this.markers[string].setMap(this.map);
        }
      }
    }
  }

  render() {
    return (
      <div
        id="map"
        className="map"
        ref={this.createRef}
      />
    );
  }
}


export default MapView;
