import React, { Component } from "react";

import {
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  Image,
  Alert
} from "react-native";
import MyHeader from "./MyHeader";

export default class Login extends Component {
  static navigationOptions = {
    drawerLabel: "Login"
  }

  state = {
    username: "",
    password: "",
    user: null
  };

  

  

  onChangeText = (text, key) => {
    this.setState({
      [key]: text
    });
  };

  handleClick = () => {
    fetch(`http://localhost:3000/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        if (data) {
          AsyncStorage.setItem("user", "" + data.id);
          this.props.navigation.setParams({
            data
          })
          this.setState({
            user: data,
            username: "",
            password: ""
          });

          this.props.navigation.navigate("Trackings");
        } else {
          this.setState({});
          Alert.alert("Error", "Account information incorrect!");
        }
      });
  };

  render() {

    return (
      <View>
        <MyHeader {...this.props} />
        <Text>Log In</Text>
        <Text>Username</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "username")}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          value={this.state.username}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "password")}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          secureTextEntry={true}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleClick}></Button>
        <Button
          onPress={() => this.props.navigation.navigate("Signup")}
          title="Create Account"
        />
      </View>
    );
  }
}
