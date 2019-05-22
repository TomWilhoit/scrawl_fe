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

  componentWillMount = async () => {
    await this.getStartLocation();
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
  };

  render() {
    console.log(this.state);
    const { currentLatitude, currentLongitude } = this.state;
    if (currentLatitude == null) {
      return <Text>Loading</Text>;
    } else {
      return (
        <MapView
          style={{
            flex: 1
          }}
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
          }}
          showsUserLocation={true}
        />
      );
    }
  }
}
