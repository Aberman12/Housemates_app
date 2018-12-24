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
class JoinHouse extends Component {
  joinHouse() {
    Actions.joinHouse();
  }
  createHouse() {
    Actions.createHouse();
  }

  render() {
    return (
      <Card>
        <CardSection style={{ marginTop: 100 }}>
          <Text>Search for a House By Name or ID</Text>
        </CardSection>
        <CardSection>
          <Input placeholder="search" />
        </CardSection>
        <CardSection>
          <Text>or</Text>
        </CardSection>
        <CardSection>
          <Text> a phone number in your contacts</Text>
        </CardSection>
        <CardSection>
          <Button>Search for Contact</Button>
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

export default JoinHouse;
