import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
var Filter = require("bad-words");

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: ["shit", "Example comment 2", "Example comment 3"]
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
      filter = new Filter();
      const commentsDisplay = this.state.comments.map((comment, index) => {
        let cleanComment = filter.clean(comment);
        // console.log(cleanComment)
        return <Text key={index}>{cleanComment}</Text>;
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
          backgroundColor: "#006992"
        }}
      >
        <TouchableOpacity
          style={{
            height: 35,
            marginTop: 25,
            justifyContent: "center",
            paddingLeft: 15
          }}
          onPress={() => this.props.onPress("home")}
          textAlign="left"
        >
          <Icon name="angle-left" size={30} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            height: 45,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
            fontSize: 25,
            alignItems: "center"
          }}
        >
          {this.props.currentWall.title}
        </Text>
        <View
          style={{
            height: 200,
            backgroundColor: "lightblue",
            width: "100%"
          }}
        >
          {this.displayComments()}
        </View>
        <TextInput
          style={{
            height: 60,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
            justifyContent: "center"
          }}
          placeholder="Say something, anything bruh it's your world."
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          style={{
            height: 100,
            backgroundColor: "#87b38d",
            width: "100%",
            justifyContent: "center",
            marginBottom: -57
          }}
          onPress={() => this.onSubmit("home")}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              fontSize: 40
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
