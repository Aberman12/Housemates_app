import React, { Component } from 'react';
import { Text, View, Modal, TouchableOpacity, Picker, Content, Image, Label } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input, Card } from './common';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import { createCalendarEvent } from '../actions';
const uuidv4 = require('uuid/v4');

class CalendarEventCreatorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: '',
      showCreateEndDate: false,
      time: '',
      showCreateTime: false,
      name: '',
      note: '',
      members: []
    };
  }

  addEndDate(endDate) {
    console.log('first step for date: ', endDate);
    this.setState({ endDate });
  }

  onChangeTextFunc(name) {
    this.setState({ name });
  }

  onChangeNoteFunc(note) {
    this.setState({ note });
  }

  // createEndDate() {
  //   if (this.state.showCreateEndDate && !this.state.endDate) {
  //     return (
  //       <DatePicker
  //         style={{ width: 200 }}
  //         date={this.state.date || this.props.date || new Date()}
  //         mode="date"
  //         placeholder="select date"
  //         format="YYYY-MM-DD"
  //         minDate={new Date() - 1}
  //         maxDate="2019-06-01"
  //         confirmBtnText="Confirm"
  //         cancelBtnText="Cancel"
  //         onCloseModal={() => this.setState({ showCreateEndDate: false })}
  //         customStyles={{
  //           // dateIcon: {
  //           //   position: "absolute",
  //           //   left: 0,
  //           //   top: 4,
  //           //   marginLeft: 0
  //           // },
  //           dateInput: {
  //             marginLeft: 36
  //           }
  //         }}
  //         onDateChange={date => {
  //           this.addEndDate(date);
  //         }}
  //       />
  //     );
  //   } else if (this.state.endDate) {
  //     return (
  //       <Text
  //         style={{
  //           paddingTop: 10,
  //           paddingBottom: 10,
  //           textAlign: 'center',
  //           fontSize: 20,
  //           justifyContent: 'center'
  //         }}
  //       >
  //         End Date Selected
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text
  //         style={{
  //           paddingTop: 10,
  //           paddingBottom: 10,
  //           textAlign: 'center',
  //           fontSize: 20,
  //           justifyContent: 'center'
  //         }}
  //       >
  //         Press to Add End Date (Optional)
  //       </Text>
  //     );
  //   }
  // }

  createTime() {
    if (this.state.showCreateTime && !this.state.time) {
      return (
        <DateTimePicker
          date={new Date()}
          isVisible={this.state.showCreateTime}
          onConfirm={() => this.setState({ time: '1:00 PM' })}
          onCancel={() => this.setState({ showCreateTime: false })}
          mode="time"
        />
      );
    } else if (this.state.time) {
      return (
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: 'center',
            fontSize: 20,
            justifyContent: 'center'
          }}
        >
          Event Scheduled for: {this.state.time}
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: 'center',
            fontSize: 20,
            justifyContent: 'center'
          }}
        >
          Press to Add Time
        </Text>
      );
    }
  }

  cancel() {
    this.setState({
      endDate: '',
      showCreateEndDate: false,
      time: '',
      showCreateTime: false,
      name: '',
      note: ''
    });
    Actions.pop();
  }

  showMissingEntryError(error) {
    window.alert(`${error} is incomplete or missing`);
  }

  create() {
    let { name, time, note, members } = this.state;

    if (!this.state.time) {
      this.showMissingEntryError('Event time');
    } else if (!this.state.name) {
      this.showMissingEntryError('Event name');
    } else {
      if (this.state.endDate) {
        // let startDateCalendarEvent = {
        //   name,
        //   time,
        //   note,
        //   color: 'green',
        //   startingDay: true,
        //   endingDay: false,
        //   date: this.props.calendarDateSelected,
        //   _id: uuidv4()
        // };
        // let endDateCalendarEvent = {
        //   name,
        //   time,
        //   note,
        //   endDate,
        //   startingDay: false,
        //   endingDay: true,
        //   _id: uuidv4(),
        //   color: 'green'
        // };
        // this.props.createCalendarEvent(startDateCalendarEvent, endDateCalendarEvent);
        // Actions.pop();
      } else {
        let calendarEvent = {
          name,
          time,
          members,
          note,
          date: this.props.calendarDateSelected,
          _id: uuidv4()
        };
        this.props.createCalendarEvent(calendarEvent);
        Actions.pop();
      }
    }
  }

  selectMember(member) {
    if (!this.state.members.includes(member)) {
      this.setState({ members: this.state.members.concat(member) });
    } else {
      this.setState({ members: this.state.members.filter(memInState => memInState !== member) });
    }
  }

  userImageCSS(info) {
    let op = 0.3;

    if (this.state.members.includes(info)) {
      op = 1;
    }

    return {
      borderColor: 'green',
      borderRadius: 40,
      borderWidth: 3,
      height: 80,
      marginBottom: 15,
      width: 80,
      opacity: op
    };
  }

  render() {
    const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;
    return (
      <View>
        <Card style={cardStyle}>
          <CardSection style={cardSectionStyle}>
            <Text
              style={{
                paddingTop: 70,
                paddingBottom: 40,
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: 30
              }}
            >
              Create New Calendar Event
            </Text>
          </CardSection>

          <CardSection>
            <Input onChangeText={text => this.onChangeTextFunc(text)} placeholder="Event name" />
          </CardSection>
          <CardSection>
            <Text style={{ marginRight: -80 }}>Add note: </Text>
            <Input
              placeholder="Add extra info"
              type="text"
              onChangeText={text => this.onChangeNoteFunc(text)}
            />
          </CardSection>
          <CardSection>
            <TouchableOpacity
              onPress={() => this.setState({ showCreateTime: !this.state.showCreateTime })}
            >
              {this.createTime()}
            </TouchableOpacity>
          </CardSection>
          {/* <CardSection>
            <TouchableOpacity
              onPress={() => this.setState({ showCreateEndDate: !this.state.showCreateEndDate })}
            >
              {this.createEndDate()}
            </TouchableOpacity>
          </CardSection> */}
          <CardSection>
            <Text>Select Event Members</Text>
            {this.props.members.map(member => {
              return (
                <TouchableOpacity onPress={() => this.selectMember(member)}>
                  <Image
                    style={this.userImageCSS(member)}
                    source={{
                      uri: 'http://www.venmond.com/demo/vendroid/img/avatar/big.jpg'
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.cancel()}>Cancel</Button>
            <Button onPress={() => this.create()}>Create</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  cardStyle: {
    borderRadius: 50
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

const mapStateToProps = ({ CalendarReducer, groupReducer }) => {
  const { calendarDateSelected } = CalendarReducer;
  const { members } = groupReducer;
  return { calendarDateSelected, members };
};

export default connect(
  mapStateToProps,
  { createCalendarEvent }
)(CalendarEventCreatorPage);
