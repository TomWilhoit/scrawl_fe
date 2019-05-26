import React from "react";
import App from "./App";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: ['Example comment 1','Example comment 2', 'Example comment 3']
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
          backgroundColor: '#006992'
        }}
      >
          <TouchableOpacity style={{height: 25, alignItems:'center'}} onPress={() => this.props.onPress("home")}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: "bold",
              color: "white",
              fontSize: 15
            }}
          >
             Click me to go back 
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 400,
            backgroundColor: "lightblue",
            width: "100%",
            marginTop: 10
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
          style={{ height: 100, backgroundColor: "#87b38d", width: "100%", justifyContent: 'center', marginBottom: -57 }}
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
