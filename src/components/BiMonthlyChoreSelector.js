import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { changeChoreDate, changeOffSet } from '../actions';
import RNPickerSelect from 'react-native-picker-select';

class BiMonthlyChoreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        {
          label: 'Sunday',
          value: 'sunday',
          color: 'orange'
        },
        {
          label: 'Monday',
          value: 'monday',
          color: 'orange'
        },
        {
          label: 'Tusday',
          value: 'tusday',
          color: 'orange'
        },
        {
          label: 'Wednesday',
          value: 'wednesday',
          color: 'orange'
        },
        {
          label: 'Thursday',
          value: 'thursday',
          color: 'orange'
        },
        {
          label: 'Friday',
          value: 'friday',
          color: 'orange'
        },
        {
          label: 'Saturday',
          value: 'saturday',
          color: 'orange'
        }
      ],
      favNumber: 'none-selected',
      offSet: false,
      offSetDone1: false,
      offSetDone2: false,
      message: 'Press to Select Date'
    };
  }

  componentWillMount() {
    if (this.props.date) {
      this.setState({ offSet: this.props.date.offSet, favNumber: this.props.date.date });
    }
  }

  submitInfo() {
    let info = {
      date: this.state.favNumber,
      offSet: this.state.offSet,
      offSetDone1: this.state.offSetDone1,
      offSetDone2: this.state.offSetDone2
    };
    this.props.changeChoreDate(info, false, 'Bi-monthly');
    this.setState({ display: false, message: 'Date Successfully Selected' });
  }

  displayComponent() {
    if (this.state.display) {
      return (
        <View>
          <CardSection>
            <Text>1st/3rd</Text>
            <Switch
              value={this.state.offSet}
              onValueChange={value => {
                this.setState({
                  offSet: value
                });
              }}
            />
            <Text>2nd/4th</Text>
          </CardSection>
          <CardSection>
            <RNPickerSelect
              placeholder={{
                label: 'Select monthly due date',
                value: null,
                color: 'black'
              }}
              items={this.state.numbers}
              // onDonePress={() => this.submitInfo()}
              onValueChange={value => {
                this.setState({
                  favNumber: value
                });
              }}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10
                }
              }}
              value={this.state.favNumber}
              placeholderTextColor="orange"
              Icon={() => {
                return (
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      borderTopWidth: 10,
                      borderTopColor: 'gray',
                      borderRightWidth: 10,
                      borderRightColor: 'transparent',
                      borderLeftWidth: 10,
                      borderLeftColor: 'transparent',
                      width: 0,
                      height: 0,
                      marginLeft: 30
                    }}
                  />
                );
              }}
            />
          </CardSection>
          <CardSection>
            <Button>Cancel</Button>
            <Button onPress={() => this.submitInfo()}>Confirm</Button>
          </CardSection>
        </View>
      );
    } else if (!this.state.display) {
      return (
        <Text
          style={{ fontSize: 20, textAlign: 'center' }}
          onPress={() => this.setState({ display: true })}
        >
          {this.state.message}
        </Text>
      );
    }
  }

  render() {
    return <View style={{ flex: 1 }}>{this.displayComponent()}</View>;
  }
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    // borderColor: 'eggplant',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

const mapStateToProps = ({ groupReducer }) => {
  const { choreType } = groupReducer;
  return { choreType };
};

export default connect(
  mapStateToProps,
  { changeChoreDate, changeOffSet }
)(BiMonthlyChoreSelector);
