import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { changeChoreDate } from '../actions';
import { CardSection, Button } from './common';

class WeeklyChoreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sunday: 'white',
      monday: 'white',
      tuesday: 'white',
      wednesday: 'white',
      thursday: 'white',
      friday: 'white',
      saturday: 'white',
      done: {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
      },
      displayed: false,
      message: 'Press to select due dates'
    };
  }

  componentWillMount() {
    if (this.props.date) {
      this.setState({
        sunday: this.props.date.sunday,
        monday: this.props.date.monday,
        tuesday: this.props.date.tuesday,
        wednesday: this.props.date.wednesday,
        thursday: this.props.date.thursday,
        friday: this.props.date.friday,
        saturday: this.props.date.saturday
      });
    }
  }

  displayWeeklySelector() {
    if (this.state.displayed) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (this.state.sunday === 'white') {
                this.setState({ sunday: '#89cff0' });
              } else {
                this.setState({ sunday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.sunday
              }}
            >
              Sunday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.monday === 'white') {
                this.setState({ monday: '#89cff0' });
              } else {
                this.setState({ monday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                borderRadius: 5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.monday
              }}
            >
              Monday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.tuesday === 'white') {
                this.setState({ tuesday: '#89cff0' });
              } else {
                this.setState({ tuesday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.tuesday
              }}
            >
              Tuesday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.wednesday === 'white') {
                this.setState({ wednesday: '#89cff0' });
              } else {
                this.setState({ wednesday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.wednesday
              }}
            >
              Wednesday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.thursday === 'white') {
                this.setState({ thursday: '#89cff0' });
              } else {
                this.setState({ thursday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.thursday
              }}
            >
              Thursday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.friday === 'white') {
                this.setState({ friday: '#89cff0' });
              } else {
                this.setState({ friday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.friday
              }}
            >
              Friday
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.state.saturday === 'white') {
                this.setState({ saturday: '#89cff0' });
              } else {
                this.setState({ saturday: 'white' });
              }
            }}
          >
            <Text
              style={{
                borderBottomColor: 'red',
                borderBottomWidth: 0.5,
                marginBottom: 15,
                textAlign: 'center',
                fontSize: 20,
                backgroundColor: this.state.saturday
              }}
            >
              Saturday
            </Text>
          </TouchableOpacity>
          <CardSection>
            <Button>Cancel</Button>
            <Button onPress={() => this.submitInfo()}>Confirm</Button>
          </CardSection>
        </View>
      );
    } else {
      return <Text style={{ fontSize: 20, textAlign: 'center' }}>{this.state.message}</Text>;
    }
  }

  submitInfo() {
    this.setState({ displayed: false, message: 'Due dates selected' });
    this.props.changeChoreDate(this.state, false, 'weekly');
  }

  determineBorderDisplay() {
    if (this.state.displayed) {
      return 0.5;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <View
        style={{
          borderWidth: this.determineBorderDisplay(),
          borderColor: '#d6d7da',
          flex: 1
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (this.state.displayed === false) {
              this.setState({ displayed: true });
            }
          }}
        >
          {this.displayWeeklySelector()}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({ groupReducer }) => {
  const { newChoreDueDate } = groupReducer;
  return { newChoreDueDate };
};

export default connect(
  mapStateToProps,
  { changeChoreDate }
)(WeeklyChoreSelector);
