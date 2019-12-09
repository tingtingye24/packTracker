import React from "react";
import {
  Button,
  View,
  AsyncStorage,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import MyHeader from "../components/MyHeader";
import TrackingCard from "../components/TrackingCard";

export default class TrackingContainer extends React.Component {
  static navigationOptions = {
    drawerLabel: "Trackings"
  };

  state = {
    trackings: [],
    user: this.props.navigation.getParam("user")
  };
  componentDidMount() {
    this._retrieveData();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.user !== prevState.user){
      this.forceUpdate();
    }
  }

  shouldComponentUpdate() {
    if (this.state.user || this.props.navigation.getParam("user") ) {
      this._retrieveData();
      return true;
    } else {
      return false;
    }
  }

  removeTracking = id => {
    let newTrackings = this.state.trackings.filter(
      tracking => tracking.id !== id
    );
    this.setState({
      trackings: newTrackings,
      user: this.props.navigation.getParam("user")
    });
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        this.fetchTracking(value);
      } else {
        this.setState({
          trackings: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchTracking(value) {
    fetch(`https://pack-tracker-api.herokuapp.com/trackings/${value}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          trackings: data,
          user: this.props.navigation.getParam("user")
        })
      );
  }

  renderTracking() {
    return this.state.trackings.map(tracking => (
      <TrackingCard
        key={tracking.id}
        tracking={tracking}
        removeTracking={this.removeTracking}
        {...this.props.navigation}
      />
    ));
  }

  render() {
    // console.log(this.state.user)
    return (
      <View style={styles.container}>
        <MyHeader {...this.props} />
        <ScrollView style={styles.scrollContainer}>
          {this.renderTracking()}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              if (this.state.user) {
                this.props.navigation.navigate("AddTracking",{user: this.props.navigation.getParam("user")});
              } else {
                Alert.alert("Error", "You have not signed in!");
              }
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 40,
    backgroundColor: "rgb(217, 235, 227)",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10
  },
  addButtonText: {
    color: "white",
    // fontSize: 24
  },
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1
  }
});
