import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";
import { MapView } from "expo";
import { Permissions } from "expo";
import { fetchData } from "./utils/fetchData";
import { apiKey } from "./utils/key";
import { mapStyle } from "./styles";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentLatitude: null,
      currentLongitude: null
    };
  }

  componentWillMount = async () => {
    const LatLong = await this.getStartLocation();
    this.getStartLocationData(LatLong);
  };

  getStartLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: false, maximumAge: 1000 }
    );
    console.log(this.state);
    // this.getStartLocationData();
  };

  getStartLocationData = async () => {
    if (this.state.currentLongitude === null) {
      console.log("still null");
    } else {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        this.state.currentLatitude
      },${this.state.currentLongitude}&key=${apiKey}`;
      const result = await fetchData(url);
      console.log(result);
    }
  };

  onPress = () => {
    this.getStartLocation();
  };

  render() {
    const { currentLatitude, currentLongitude } = this.state;
    if (currentLatitude == null) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            backgroundColor: 183642
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 50 }}>
            Loading
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 183642
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 30 }}
            >
              Scrawl
            </Text>
          </View>
          <MapView
            customMapStyle={mapStyle}
            style={{
              marginTop: 5,
              height: 400
            }}
            initialRegion={{
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
            }}
            showsUserLocation={true}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity 
            style={{
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: '#e5625e'
            }}
            onPress={this.onPress}>
              <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}> Reload Chatrooms </Text>
            </TouchableOpacity>
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 20, marginTop: 4 }}
            >
              First Wall
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 20, marginTop: 4 }}
            >
              Second Wall
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 20, marginTop: 4 }}
            >
              Third Wall
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 20, marginTop: 4 }}
            >
              Fourth Wall
            </Text>
            <Text
              style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 20, marginTop: 4 }}
            >
              Fifth Wall
            </Text>
          </View>
        </View>
      );
    }
  }
}
