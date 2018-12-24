import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Card,
  CardSection,
  HouseButton,
  Button,
  SignUpButton,
  SignUpButtonEmail,
  Spinner,
  Input
} from "./common";
class CreateHouse extends Component {
  render() {
    return (
      <Card>
        <CardSection style={{ marginTop: 100 }}>
          <Input placeholder="House Name" />
        </CardSection>
        <CardSection>
          <Input placeholder="Zip Code" />
        </CardSection>
        <CardSection>
          <Button style={{ color: "orange" }}>Invite Members</Button>
        </CardSection>
        <CardSection>
          <Button>Create House</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    fontSize: 20,
    color: "red"
  }
};

export default CreateHouse;
