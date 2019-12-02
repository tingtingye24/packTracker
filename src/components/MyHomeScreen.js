import React from "react";
import { Button, Text, View} from "react-native";

import MyHeader from './MyHeader'

export default class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home"
  };

  render() {
    return (
      <View>
        <MyHeader {...this.props}/>

        <Text> Hello?</Text>
      </View>
      // <Button
      //   onPress={() => this.props.navigation.navigate('Notifications')}
      //   title="Go to notifications"
      // />
    );
  }
}
