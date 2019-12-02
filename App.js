import React from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import MyHomeScreen from "./src/components/MyHomeScreen";
import TrackingContrainer from "./src/container/TrackingContrainer";
import Login from "./src/components/Login";

import MoreInfoContainer from "./src/container/MoreInfoContainer";

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen
  },
  Trackings: {
    screen: TrackingContrainer
  },
  Login: {
    screen: Login
  },
  MoreInfo: {
    screen: MoreInfoContainer,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
});

const App = createAppContainer(MyDrawerNavigator);


// class App extends React.Component {
//   render() {
//     
//     return (
//       <View>
//         {MyApp}
//         <MyHeader {...this.props}/>
        
//         <Text> Hello?</Text>
//       </View>
//     );
//   }
// }

export default App;
