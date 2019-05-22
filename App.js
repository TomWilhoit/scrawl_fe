import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLatitude: null,
      currentLongitude: null
    };
  }

  componentWillMount =  () => {
      this.getStartLocation();
  };

  getStartLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
    console.log(this.state)
  };

  render() {
    const { currentLatitude, currentLongitude } = this.state;
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
