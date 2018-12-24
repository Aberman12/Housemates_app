import React, { Component } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { CardSection } from "./common";
import CheckBox from "react-native-check-box";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;
    console.log("heres name in listItem: ", name, this.props.employee);
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <CheckBox
                style={{ flex: 1, padding: 10, paddingLeft: 30 }}
                checkBoxColor={"green"}
                onClick={() => {
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                }}
                isChecked={this.state.isChecked}
                leftText={this.props.employee}
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

export default ListItem;
