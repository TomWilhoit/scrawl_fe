import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  render() {
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
        <TouchableOpacity onPress={() => this.onPress("home")}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", color: "#eaeaea", fontSize: 50 }}>
          {this.props.displayedPage}
        </Text>
      </View>
    );
  }
}
