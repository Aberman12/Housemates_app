import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { createNewHouseName, houseZipChange, createGroup } from "../actions";
import { Card, CardSection, Button, Spinner, Input } from "./common";
class CreateHouse extends Component {
  goTochangeHouseName(text) {
    this.props.createNewHouseName(text);
  }

  goTochangeZip(text) {
    this.props.houseZipChange(text);
  }

  onButtonPress() {
    const { houseName, zip } = this.props;
    this.props.createGroup({ houseName, zip });
  }

  renderButton() {
    console.log(this.props.loading);
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>Create House</Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection style={{ marginTop: 100 }}>
          <Input
            onChangeText={this.goTochangeHouseName.bind(this)}
            placeholder="House Name"
            value={this.props.houseName}
          />
        </CardSection>
        <CardSection>
          <Input
            onChangeText={this.goTochangeZip.bind(this)}
            placeholder="Zip Code"
            value={this.props.zip}
          />
        </CardSection>
        <CardSection>
          <Button style={{ color: "orange" }}>Invite Members</Button>
        </CardSection>
        <CardSection>{this.renderButton()}</CardSection>
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

const mapStateToProps = ({ groupReducer }) => {
  const { zip, houseName, loading } = groupReducer;
  return { zip, houseName, loading };
};

export default connect(
  mapStateToProps,
  {
    createNewHouseName,
    houseZipChange,
    createGroup
  }
)(CreateHouse);
