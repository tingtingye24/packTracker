import React, { Component } from "react";
import { View, Text, TextInput, Picker, Button } from "react-native";
import { Header } from "react-native-elements";

export default class AddTracking extends Component {
  static navigationOptions = {
    drawerLabel: "AddTracking"
  };

  state = {
    carriers: [],
    packageName: "",
    trackingNumber: "",
    carrier: "",
    
  };

  componentDidMount() {
    fetch("https://pack-tracker-api.herokuapp.com/carriers")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          carriers: data
        });
      });
  }

  onChangeText = (text, key) => {
    this.setState({
      [key]: text
    });
  };

  handleSubmit = () => {
    fetch("https://pack-tracker-api.herokuapp.com/trackings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: this.state.packageName,
        carrier_id: this.state.carrier,
        user_id: this.props.navigation.getParam("user").id,
        tracking_number: this.state.trackingNumber
      })
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          packageName: "",
          trackingNumber: "",
          carrier: ""
        });
      });
    this.props.navigation.navigate("Trackings");
  };

  render() {
    console.log(this.state.trackingNumber);
    console.log(this.state.packageName);
    console.log(this.state.carrier);
    console.log(this.props.navigation.getParam("user"), "this is the user");
    return (
      <View>
        <Header
          leftComponent={{
            icon: "arrow-back",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("Trackings")
          }}
          centerComponent={{
            text: "More Information",
            style: { color: "#fff" }
          }}
          backgroundColor="rgb(71, 192, 152)"
        />
        <Text>Package Name</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "packageName")}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10
          }}
          value={this.state.packageName}
        />
        <Text>Tracking Number</Text>
        <TextInput
          onChangeText={text => this.onChangeText(text, "trackingNumber")}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10
          }}
          value={this.state.trackingNumber}
        />
        <Picker
          selectedValue={this.state.carrier}
          style={{ height: 300, width: "100%" }}
          onValueChange={text => this.onChangeText(text, "carrier")}
        >
          {this.state.carriers.map(carrier => (
            <Picker.Item key={carrier.id} label={carrier.name} value={carrier.id} />
          ))}
        </Picker>

        <Button title="Submit" onPress={this.handleSubmit} />
      </View>
    );
  }
}
