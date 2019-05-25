import React from "react";
import App from "./App";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: ['Example comment 1','Example comment 2', 'Example comment3']
    };
  }

  onSubmit = () => {
    const newComment = this.state.text;
    this.setState({
      comments: [...this.state.comments, newComment]
    });
  };

  displayComments = () => {
    if (this.state.comments.length) {
      const commentsDisplay = this.state.comments.map((comment, index) => {
        return <Text key={index}>{comment}</Text>;
      });
      return commentsDisplay;
    } else if (!this.state.comments.length) {
      return (
        <Text
          style={{
            marginTop: 130,
            textAlign: "center",
            fontWeight: "bold",
            color: "#eaeaea",
            fontSize: 20
          }}
        >
          No Comments Yet!
        </Text>
      );
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: 183642
        }}
      >
        <View
          style={{
            height: 300,
            backgroundColor: "lightblue",
            width: "100%",
            marginTop: -150
          }}
        >
          {this.displayComments()}
        </View>
        <TextInput
          style={{
            height: 100,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
          }}
          placeholder="Say something, anything bruh it's your world."
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          style={{ height: 50, backgroundColor: "lightgreen", width: "100%" }}
          onPress={() => this.onSubmit("home")}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: 25
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPress("home")}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: "bold",
              color: "white",
              fontSize: 15,
              marginTop: 25
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
