import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
var Filter = require("bad-words");

export default class Wall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
      text: "",
      comments: null
    };
  }

  componentDidMount = () => {
    this.gatherComments();
    setInterval(() => this.gatherComments(), 1000);

  };

  gatherComments = async () => {
    const pk = this.props.currentWall.pk;
    const url = `https://scrawlr.herokuapp.com/api/v1/walls/${pk}`;
    try {
      const response = await fetch(url);
      let responseJson = await response.json();
      const reversed = responseJson.comments.reverse();
      const reversedTwice = reversed.reverse()
      this.setState({
        comments: reversedTwice
      });
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async () => {
    const check = this.props.checkProximity(
      this.props.currentWall.lat,
      this.props.currentWall.lng
    );
    if (check) {
      const newComment = this.state.text;
      if (newComment.length > 0) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify({ comment: newComment })
        };
        this.setState({
          comments: [...this.state.comments, newComment],
          text: ''
        });
        const pk = this.props.currentWall.pk;
        const url = `https://scrawlr.herokuapp.com/api/v1/walls/${pk}/comments`;
        try {
          const response = await fetch(url, options);
          let responseJson = await response.json();
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Type more?");
      }
    } else {
      alert("YOU DON'T EVEN GO HERE");
    }
  };

  displayComments = () => {
    const check = this.props.checkProximity(
      this.props.currentWall.lat,
      this.props.currentWall.lng
    );
    console.log('Wall Check method', check)
    if (check) {
      if(this.state.comments === null){
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
            LOADING COMMENTS
          </Text>
        );
    }else if (this.state.comments.length > 0) {
        filter = new Filter();
        const commentsDisplay = this.state.comments.map((comment, index) => {
          let cleanComment = filter.clean(comment);
          return (
            <Text
              style={{
                paddingLeft: 10,
                margin: 5,
                fontSize: 22.5,
                color: "#27476e"
              }}
              key={index}
            >
              {cleanComment}
            </Text>
          );
        });
        return commentsDisplay;
      } else if(this.state.comments.length === 0) {
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
      return <Text
      style={{
        marginTop: 130,
        textAlign: "center",
        fontWeight: "bold",
        color: "#eaeaea",
        fontSize: 20
      }}
    >
      You are too far from this wall. 
    </Text>;
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 35
          }}
        >
          {this.props.fontLoaded ? (
            <Text
              style={{
                fontFamily: "PermanentMarker",
                fontSize: 30,
                color: "#f7f9f9",
                fontSize: 30
              }}
            >
              {this.props.currentWall.name}
            </Text>
          ) : null}
        </View>
        <TextInput
          style={{
            height: 60,
            backgroundColor: "white",
            width: "100%",
            textAlign: "center",
            justifyContent: "center"
          }}
          value={this.state.text}
          placeholder="Say something, anything bruh it's your world."
          onChangeText={text => this.setState({ text })}
        />
        <ScrollView
          style={{
            maxHeight: 400,
            backgroundColor: "lightblue",
            width: "100%",
            stickyBottom: true
          }}
        >
          {this.displayComments()}
        </ScrollView>
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
