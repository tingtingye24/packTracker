import React from "react";
import { Button, View, AsyncStorage, Text, ScrollView } from "react-native";
import MyHeader from "../components/MyHeader";
import TrackingCard from "../components/TrackingCard";


export default class TrackingContainer extends React.Component {
  static navigationOptions = {
    drawerLabel: "Trackings"
  };

  

  state = {
    trackings: [],
    user: null
  };
  componentDidMount() {
    this._retrieveData();
  }


  shouldComponentUpdate(){
    if (this.state.trackings){
      this._retrieveData();
      return true;
    }else{
      return false;
    }
  }

  removeTracking = id => {
    let newTrackings = this.state.trackings.filter(
      tracking => tracking.id !== id
    );
    this.setState({
      trackings: newTrackings
    });
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log(value);
        this.fetchTracking(value);
      }else{
        this.setState({
        trackings: []
      })
      }
    } catch (error) {
      this.setState({
        trackings: []
      })
      console.log(error);
    }
  };

  fetchTracking(value) {
    fetch(`http://localhost:3000/trackings/${value}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          trackings: data,
          user: value
        })
      );
  }

  renderTracking() {
    return this.state.trackings.map(tracking => <TrackingCard key={tracking.id} tracking = {tracking} removeTracking={this.removeTracking} {...this.props.navigation} />);
  }

  render() {
    
    // console.log(this.state.trackings, "this is from container");
    return (
      <View>
        <MyHeader {...this.props} />
        <ScrollView>{this.renderTracking()}</ScrollView>
      </View>
    );
  }
}
