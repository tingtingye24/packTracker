import React, { Component } from "react";
import { Text, Image, Button, Linking } from "react-native";
import { Card } from "react-native-elements";

export default class TrackingCard extends Component {
  handleDelete = id => {
    fetch(`https://pack-tracker-api.herokuapp.com/trackings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.props.removeTracking(id);
      });
  };

  handleWebsite = carrier_url => {
    Linking.openURL(carrier_url);
  };

  render() {
    let {
      id,
      name,
      carrier_url,
      tracking_number,
      logo,
      activities
    } = this.props.tracking;
    // console.log(this.props);
    return (
      <Card title={name}>
        <Image
          source={{ uri: logo }}
          resizeMode="contain"
          style={{ width: "100%", height: 100 }}
        ></Image>
        <Text>{tracking_number}</Text>
        <Text>
          {activities[0] ? activities[0].details : "Tracking Do Not Exist"}
        </Text>
        <Button
          title="More Info"
          onPress={() =>
            this.props.navigate("MoreInfo", { activities: activities })
          }
        />
        <Button
          title="Go To Page"
          onPress={() => this.handleWebsite(carrier_url)}
        />
        <Button title="Delete" onPress={() => this.handleDelete(id)} />
      </Card>
    );
  }
}
