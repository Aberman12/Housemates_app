import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Card,
  CardSection,
  HouseButton,
  SignUpButton,
  SignUpButtonEmail,
  Spinner
} from "./common";
class HouseSignup extends Component {
  joinHouse() {
    Actions.JoinHouse();
  }
  createHouse() {
    Actions.CreateHouse();
  }

  renderButton1() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <HouseButton
        onPress={this.joinHouse.bind(this)}
        style={{ borderRadius: 50 }}
      >
        Join
      </HouseButton>
    );
  }

  renderButton2() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <HouseButton onPress={this.createHouse.bind(this)}>Create</HouseButton>
    );
  }

  render() {
    return (
      <Card>
        <CardSection style={{ marginTop: 200 }}>
          <Text style={{ marginLeft: 55 }}>Join House</Text>
          <Text style={{ marginLeft: 85 }}>Create House</Text>
        </CardSection>
        <CardSection>
          {this.renderButton1()}
          {this.renderButton2()}
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

export default HouseSignup;
