import React, { Component } from "react";
import { Header } from "react-native-elements";

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
        rightComponent={{ icon: "home", color: "#fff", onPress: () => this.props.navigation.navigate('Home') }}
        backgroundColor="rgb(71, 192, 152)"
      />
    );
  }
}
