import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import CheckBox from "react-native-check-box";
import { connect } from "react-redux";
import { showChoreEditModal } from "../actions";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  showModal(info) {
    console.log("this is my info: ", info);
    this.props.showChoreEditModal(info);
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback>
          <View>
            <CardSection>
              <Text
                style={{
                  flex: 1,
                  width: 150,
                  marginLeft: 30,
                  marginTop: 15,
                  paddingRight: 130,
                  justifyContent: "center"
                }}
                onPress={() => this.showModal(this.props)}
              >
                {this.props.employee}
              </Text>
              <CheckBox
                style={{
                  // flex: 1,
                  padding: 10,
                  // marginRight: 10,
                  paddingLeft: 20
                }}
                checkBoxColor={"green"}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                }}
                isChecked={this.state.isChecked}
                // leftText={this.props.employee}
              />
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const { choreEditModal } = groupReducer;
  return { choreEditModal };
};

export default connect(
  mapStateToProps,
  { showChoreEditModal }
)(ListItem);
