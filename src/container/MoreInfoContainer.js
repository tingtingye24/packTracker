import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import {Header} from 'react-native-elements'
import Activity from "../components/Activity";
import { ScrollView } from "react-native-gesture-handler";

export default class MoreInfoContainer extends Component {
  static navigationOptions = {
    drawerLabel: "MoreInfo"
  };

  renderActivities(){
  return this.props.navigation.getParam('activities').map(activity => <Activity activity={activity}/>)
  }
  render() {
    console.log(this.props.navigation.getParam('activities'))
    return (
      <View>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () =>this.props.navigation.navigate('Trackings')
          }}
          centerComponent={{ text: "More Information", style: { color: "#fff" } }}
          backgroundColor="rgb(71, 192, 152)"
        />
        <ScrollView>{this.renderActivities()}</ScrollView>
      </View>
    );
  }
}
