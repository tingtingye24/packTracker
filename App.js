import React from "react";
import { StyleSheet, Image, Button, View, Text } from "react-native";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";

import MyHomeScreen from "./src/components/MyHomeScreen";
import TrackingContrainer from "./src/container/TrackingContrainer";
import Login from "./src/components/Login";
import Signup from './src/components/Signup'
import AddTracking from './src/components/AddTracking'

import MoreInfoContainer from "./src/container/MoreInfoContainer";

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Login,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Trackings: {
    screen: TrackingContrainer
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  MoreInfo: {
    screen: MoreInfoContainer,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  AddTracking: {
    screen: AddTracking,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
});

const App = createAppContainer(MyDrawerNavigator);


export default App;
