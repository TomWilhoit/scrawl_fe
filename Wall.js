import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
var Filter = require("bad-words");

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      text: "",
      comments: []
    };
  }

  componentDidMount = () => {
    this.gatherComments();
  };

  gatherComments = async () => {
    const pk = this.props.currentWall.pk;
    const url = `http://127.0.0.1:8000/api/v1/walls/${pk}`;
    try {
      const response = await fetch(url);
      let responseJson = await response.json();
      this.setState({
        comments: responseJson.comments
      });
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async () => {
    const newComment = this.state.text;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify({ comment: newComment })
    };
    this.setState({
      comments: [...this.state.comments, newComment]
    });
    const pk = this.props.currentWall.pk;
    const url = `http://localhost:8000/api/v1/walls/${pk}/comments`;
    try {
      const response = await fetch(url, options);
      let responseJson = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  displayComments = () => {
    const check = this.props.checkProximity(
      this.props.currentWall.lat,
      this.props.currentWall.lng
    );
    if (check === true) {
      if (this.state.comments.length > 0) {
        filter = new Filter();
        const commentsDisplay = this.state.comments.map((comment, index) => {
          let cleanComment = filter.clean(comment);
          return <Text key={index}>{cleanComment}</Text>;
        });
        return commentsDisplay;
      } else {
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
    } else {
      return <Text>You are too far away to view this wall.</Text>;
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
        <Text>{this.props.currentWall.name}</Text>
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
