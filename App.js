import React from "react";
import {
  Text,
  View,
  TouchableOpacity
} from "react-native";
import  Wall  from "./Wall"
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
      currentLongitude: null,
      displayedPage: 'home'
    };
  }

  componentWillMount = async () => {
    const LatLong = await this.getStartLocation();
    this.getStartLocationData(LatLong);
  };

  getStartLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
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

  onPress = num => {
    this.setState({
      displayedPage: `${num}`
    })
    console.log(this.state);
  };

  render() {
    const { currentLatitude, currentLongitude,displayedPage } = this.state;
    if (currentLatitude == null && displayedPage === 'home') {
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
    } else if(currentLatitude !== null && displayedPage === 'home') {
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
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
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
              style={{ width: "100%", backgroundColor: "lightblue" }}
              onPress={() => this.onPress(1)}
            >
              <Text
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#eaeaea",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                First Wall
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%", backgroundColor: "lightblue" }}
              onPress={() => this.onPress(2)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#eaeaea",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                Second Wall
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%", backgroundColor: "lightblue" }}
              onPress={() => this.onPress(3)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#eaeaea",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                Third Wall
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%", backgroundColor: "lightblue" }}
              onPress={() => this.onPress(4)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#eaeaea",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                Fourth Wall
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "100%", backgroundColor: "lightblue" }}
              onPress={() => this.onPress(5)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#eaeaea",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                Fifth Wall
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e5625e"
              }}
              onPress={this.onPress}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 15 }}
              >
                Create a wall
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else if(currentLatitude !== null && displayedPage !== 'Home'){
      return(
        <Wall onPress={this.onPress} displayedPage={this.state.displayedPage}/>
      )
    }
  }
}
