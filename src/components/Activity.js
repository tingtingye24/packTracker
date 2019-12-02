import React, { Component } from "react";
import { Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
// import {ListItem} from 'react-native-elements'

export default class Activity extends Component {
  render() {
    let { timestamp, details, location } = this.props.activity;
    return (

      <View style={{borderWidth: "10px", borderColor: "white", backgroundColor: "rgb(217, 235, 227),", padding: "2%" }}>
        <Text style={{textAlign: "center"}}>{timestamp}</Text>
        <Text style={{textAlign: "center"}}>{details}</Text>
        <Text style={{textAlign: "center"}}>{location}</Text>
      </View>
    );
  }
}
