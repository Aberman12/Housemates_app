import _ from "lodash";
import React, { Component } from "react";
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { CardSection } from "./common";
import { connect } from "react-redux";
import { createChoreName, createNewChore } from "../actions";
import ListItem from "./ListItem";
import { ListModal } from "./common";

class IndividualList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      showModal: false
    };
  }

  onChangeTextFunc(text) {
    this.props.createChoreName(text);
  }

  onAccept() {
    if (this.props.newChoreName) {
      this.props.createNewChore(this.props);
      this.setState({ showModal: false });
    } else {
      window.alert("Please fill in a name for your chore");
    }
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  warningColor(options) {
    return {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: options.warningColor,
      borderRadius: 5,
      padding: 10,
      top: 10,
      bottom: 10,
      right: 10
    };
  }

  renderRow() {
    if (this.state.showList) {
      if (this.props.val.chores.length) {
        return (
          <View>
            {this.props.val.chores.map(chore => {
              return <ListItem employee={chore} />;
            })}
            <TouchableOpacity
              onPress={() => this.setState({ showModal: true })}
            >
              <CardSection>
                <Text
                  style={{
                    fontSize: 27,
                    marginLeft: 175,
                    color: "blue"
                  }}
                >
                  +
                </Text>
              </CardSection>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View>
            <TouchableOpacity
              onPress={() => this.setState({ showModal: true })}
            >
              <CardSection>
                <Text
                  style={{
                    fontSize: 27,
                    marginLeft: 175,
                    color: "blue"
                  }}
                >
                  +
                </Text>
              </CardSection>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showList: !this.state.showList })}
        >
          <View key={this.props.keyval} style={styles.note}>
            <Text style={styles.noteText}>{this.props.val.note}</Text>
            <TouchableOpacity
              onPress={this.props.deleteMethod}
              style={this.warningColor(this.props.val)}
            >
              <Text>&#x1f4bc;</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View>{this.renderRow()}</View>
        <ListModal
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          onChangeTextFunc={this.onChangeTextFunc.bind(this)}
        >
          Add New Chore?
        </ListModal>
      </View>
    );
  }
}

const styles = {
  note: {
    position: "relative",
    padding: 20,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ededed",
    zIndex: 10
  },
  noteText: {
    paddingLeft: 0,
    borderLeftWidth: 10,
    borderLeftColor: "#E91E63",
    fontSize: 25
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const { newChoreName, chores } = groupReducer;
  return { newChoreName, chores };
};

export default connect(
  mapStateToProps,
  { createChoreName, createNewChore }
)(IndividualList);
