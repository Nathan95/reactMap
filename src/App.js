import React, {Component} from 'react';
import data from './data';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './App.css';


class App extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div className="App">
          <Map google={this.props.google} zoom={4}>
            {Object.keys(data).map((item, i) => (
              <Marker key={i} onClick={this.onMarkerClick}
                name={data[item].name}
                position={{lat: data[item].latitude, lng: data[item].longitude}}
              />
            ))}
            
            <InfoWindow
               marker={this.state.activeMarker}
               visible={this.state.showingInfoWindow}
              >
              <div>{this.state.selectedPlace.name}</div>
           </InfoWindow>
          </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyB7OghXV0bIeYRiGvNUCLoWNZN2MKLLAoQ')
})(App)
