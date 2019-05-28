import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import  Wall  from "./Wall";
import CreateWall from "./CreateWall";
import MapView, { Marker} from "react-native-maps";
import { mapStyle } from "./styles";
import WS from "react-native-websocket";
import { Font } from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      randomNum: 1,
      fontLoaded: false,
      currentLatitude: null,
      currentLongitude: null,
      currentWall: {
        latitude: 39.7653,
        longitude: -104.9791,
        title: "Improper City",
        subtitle: "Subtitle"
      },
      displayedPage: "home",
      openers: [
        {
          quote: `Maybe it will work when I'm fully dead inside`,
          author: "Peregrine"
        },
        {
          quote: `React Native is like a friend you think you know, but you don't.`,
          author: "Tommy"
        },
        { quote: `I f****** hate Django`, author: "Scott" }
      ],
      markers: [
        {
          latitude: 39.7653,
          longitude: -104.9791,
          title: "Improper City",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9793,
          title: "Test 2",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9796,
          title: "Test 3",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.9799,
          title: "Test 4",
          subtitle: "Subtitle"
        },
        {
          latitude: 39.7653,
          longitude: -104.98,
          title: "Scott likes meatballs",
          subtitle: "Subtitle"
        }
      ]
    };
  }

  componentWillMount = async () => {
    const LatLong = await this.getStartLocation();
    await Font.loadAsync({
      PermanentMarker: require("./assets/fonts/PermanentMarker-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
    const randomNum = Math.floor(Math.random() * (2 + 1));
    await this.setState({
      randomNum: randomNum
    });
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
  };

  onPress = num => {
    this.setState({
      displayedPage: `${num}`,
      currentWall: this.state.markers[num - 1]
    });
  };

  render() {
    const {
      currentLatitude,
      currentLongitude,
      displayedPage,
      fontLoaded
    } = this.state;
    if (currentLatitude == null && displayedPage === "home") {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 100,
            backgroundColor: "#006992"
          }}
        >
          {this.state.fontLoaded ? (
            <Text
              style={{
                fontFamily: "PermanentMarker",
                fontSize: 20,
                color: "white",
                margin: 15
              }}
            >
              {this.state.openers[this.state.randomNum].quote}
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "PermanentMarker",
                  fontSize: 20,
                  color: "white",
                  marginLeft: 20,
                  width: "100%"
                }}
              >
                {"\n"}
                {"\n"}-{this.state.openers[this.state.randomNum].author}{" "}
              </Text>
            </Text>
          ) : null}
        </View>
      );
    } else if (displayedPage === "CreateWall") {
      return <CreateWall onPress={this.onPress}/>;
    } else if (currentLatitude !== null && displayedPage === "home") {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#006992"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35
            }}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "PermanentMarker",
                  fontSize: 30,
                  color: "#f7f9f9",
                  fontSize: 30
                }}
              >
                Scrawl
              </Text>
            ) : null}
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
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude
                }}
                title={marker.title}
                description={marker.subtitle}
                onCalloutPress={() => this.onPress(index + 1)}
                on
              />
            ))}
          </MapView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#27476e",
                borderColor: "#2d232e",
                borderStyle: "solid",
                borderWidth: 0.5
              }}
              onPress={() => this.onPress(1)}
            >
              <Text
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#f7f9f9",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                {this.state.markers[0].title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#27476e",
                borderColor: "#2d232e",
                borderStyle: "solid",
                borderWidth: 0.5
              }}
              onPress={() => this.onPress(2)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#f7f9f9",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                {this.state.markers[1].title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#27476e",
                borderColor: "#2d232e",
                borderStyle: "solid",
                borderWidth: 0.5
              }}
              onPress={() => this.onPress(3)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#f7f9f9",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                {this.state.markers[2].title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#27476e",
                borderColor: "#2d232e",
                borderStyle: "solid",
                borderWidth: 0.5
              }}
              onPress={() => this.onPress(4)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#f7f9f9",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                {this.state.markers[3].title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#27476e",
                borderColor: "#2d232e",
                borderStyle: "solid",
                borderWidth: 0.5
              }}
              onPress={() => this.onPress(5)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#f7f9f9",
                  fontSize: 20,
                  marginTop: 4
                }}
              >
                {this.state.markers[4].title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#87b38d"
              }}
              onPress={() => this.onPress("CreateWall")}
            >
              {this.state.fontLoaded ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#f7f9f9",
                    fontSize: 15,
                    fontFamily: "PermanentMarker"
                  }}
                >
                  Create A Wall
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (currentLatitude !== null && displayedPage !== "Home") {
      return (
        <Wall currentWall={this.state.currentWall} onPress={this.onPress} displayedPage={this.state.displayedPage}/>
      );
    }
  }
}
