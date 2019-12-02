import React, { Component } from "react";
import MyHeader from "./MyHeader";
import {
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Image,
  Alert
} from "react-native";

export default class Signup extends Component {
  static navigationOptions = {
    drawerLabel: "Signup"
  };
  state = {
    username: "",
    password_digest: ""
  };
  onChangeText = (text, key) => {
    this.setState({
      [key]: text
    });
  };
  handleClick = () => {
    fetch(`http://localhost:3000/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        if (data) {
          AsyncStorage.setItem("user", "" + data.id);
          this.setState({
            user: data,
            username: "",
            password: ""
          });

          this.props.navigation.navigate("Trackings");
        } else {
          Alert.alert("Error", "Try Again!");
        }
      });
  };

  render() {
    console.log(this.state.username)
    console.log(this.state.password_digest)
    return (
      <View>
        <MyHeader {...this.props} />
        <Text>Sign Up</Text>
        <Text>Username</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "username")}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={this.state.username}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "password_digest")}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          secureTextEntry={true}
          value={this.state.password_digest}
        />
        <Button title="Sign Up" onPress={this.handleClick}></Button>
      </View>
    );
  }
}
