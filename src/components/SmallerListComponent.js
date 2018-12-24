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
import { employeesFetch } from "../actions";
import ListItem from "./ListItem";

class IndividualList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    };
  }

  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
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
        console.log(this.props.val.chores);
        return (
          <View>
            {this.props.val.chores.map(chore => {
              return <ListItem employee={chore} />;
            })}
            <TouchableOpacity>
              <CardSection>
                <Text
                  style={{
                    fontSize: 20,
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

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};

export default connect(
  mapStateToProps,
  { employeesFetch }
)(IndividualList);
