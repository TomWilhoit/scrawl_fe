import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CreateWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      comments: []
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
    console.log(this.props.currentWall)
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#006992"
        }}
      >
            <TouchableOpacity
              style={{ height: 35, marginTop: 25, justifyContent: 'center', paddingLeft: 15}}
              onPress={() => this.props.onPress("home")}
              textAlign="left"
            >
              <Icon name="angle-left" size={30} color="white"/>
            </TouchableOpacity>
        <TextInput
          style={{
            height: 45,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center"
          }}
          placeholder="Name this wall (Your location helps)."
          onChangeText={title => this.setState({ title })}
        />
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
            justifyContent: 'center'
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
