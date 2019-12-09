import React, { Component } from "react";
import { Header } from "react-native-elements";
import { AsyncStorage } from "react-native";

export default class MyHeader extends Component {
  render() {
    return (
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: this.props.navigation.openDrawer
        }}
        centerComponent={{ text: "Pack Tracker", style: { color: "#fff" } }}
        rightComponent={{ icon: "exit-to-app", color: "#fff", onPress: () => {
          AsyncStorage.removeItem('user')
          
          this.props.navigation.navigate('Home')
        }}}
        backgroundColor="rgb(71, 192, 152)"
      />
    );
  }
}
