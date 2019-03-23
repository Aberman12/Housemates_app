import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
import { createChoreName, createNewChore, createChoreNote } from '../actions';
import ListItem from './ListItem';
import ChoreModal from './CreateChoreModal';

var uuidv4 = require('uuid/v4');

class IndividualList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      showModal: false,
      warningColor: 'green'
    };
  }

  onChangeTextFunc(text) {
    this.props.createChoreName(text);
  }

  onChangeNoteFunc(text) {
    this.props.createChoreNote(text);
  }

  onAccept() {
    let newChore = {
      name: this.props.newChoreName,
      _id: uuidv4(),
      warningColor: this.state.warningColor,
      dueDate: this.props.newChoreDueDate,
      done: false,
      type: this.props.choreType,
      note: this.props.choreNote,
      memberSelected: this.props.memberSelected,
      dateCreated: Date.now()
    };
    if (this.props.newChoreName && this.props.newChoreDueDate) {
      let dueDate = this.props.newChoreDueDate;
      console.log('latest:::::::  ', this.props.newChoreName, dueDate);
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';
      let selectDays = new Array(7);
      let beforeSelectDays = [];
      var n = d.getDay();
      console.log('hasOwnProperty Error: ', dueDate);
      if (dueDate.hasOwnProperty('done')) {
        for (let day in dueDate) {
          if (dueDate[day] === '#89cff0') {
            beforeSelectDays.push(day);
          }
        }
        for (var i = 0; i < beforeSelectDays.length; i++) {
          if (beforeSelectDays[i] === 'sunday') {
            selectDays[0] = 'sunday';
          }
          if (beforeSelectDays[i] === 'monday') {
            selectDays[1] = 'monday';
          }
          if (beforeSelectDays[i] === 'tuesday') {
            selectDays[2] = 'tuesday';
          }
          if (beforeSelectDays[i] === 'wednesday') {
            selectDays[3] = 'wednesday';
          }
          if (beforeSelectDays[i] === 'thursday') {
            selectDays[4] = 'thursday';
          }
          if (beforeSelectDays[i] === 'friday') {
            selectDays[5] = 'friday';
          }
          if (beforeSelectDays[i] === 'saturday') {
            selectDays[6] = 'saturday';
          }
        }

        for (var t = 0; t < weekday.length; t++) {
          if (selectDays.includes(weekday[t]) && t < n) {
            dueDate.done[weekday[t]] = true;
          }
        }
      }
      console.log('about to hit createNewChore: ', this.props.val._id, newChore);
      this.props.createNewChore(this.props.val._id, newChore);
      this.setState({ showModal: false });
    } else {
      window.alert('Please fill in a all info');
    }
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  warningColor(options) {
    let finishedChore = 'line-through';
    console.log('options: ', options);
    return {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: options.warningColor,
      borderRadius: 5,
      padding: 10,
      top: 10,
      bottom: 10,
      right: 10,
      textDecorationLine: 'line-through'
    };
  }

  renderRow() {
    if (this.state.showList) {
      console.log('hasOwnProperty Error: ', this.props.val);
      if (this.props.val.hasOwnProperty('chores') && this.props.val.chores.length) {
        return (
          <View>
            {this.props.val.chores.map(chore => {
              return <ListItem chore={chore} choreListId={this.props.val._id} />;
            })}
            <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
              <CardSection>
                <Text
                  style={{
                    fontSize: 27,
                    marginLeft: 175,
                    color: 'blue'
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
            <TouchableOpacity onPress={() => this.setState({ showModal: true })}>
              <CardSection>
                <Text
                  style={{
                    fontSize: 27,
                    marginLeft: 175,
                    color: 'blue'
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
        <TouchableOpacity onPress={() => this.setState({ showList: !this.state.showList })}>
          <View key={this.props.keyval} style={styles.name}>
            <Text style={styles.nameText}>{this.props.val.name}</Text>
            <TouchableOpacity
              onPress={this.props.deleteMethod}
              style={this.warningColor(this.props.val)}
            >
              <Text>&#x1f4bc;</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View>{this.renderRow()}</View>
        <ChoreModal
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          onChangeTextFunc={this.onChangeTextFunc.bind(this)}
          onChangeNoteFunc={this.onChangeNoteFunc.bind(this)}
          props={this.props.choreType}
        >
          Add New Chore?
        </ChoreModal>
      </View>
    );
  }
}

const styles = {
  name: {
    position: 'relative',
    padding: 20,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
    zIndex: 10
  },
  nameText: {
    paddingLeft: 0,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63',
    fontSize: 25
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const {
    newChoreName,
    chores,
    choreType,
    newChoreListName,
    newChoreDueDate,
    dueDateEdited,
    choreNote,
    memberSelected
  } = groupReducer;
  return {
    newChoreName,
    chores,
    choreNote,
    choreType,
    newChoreListName,
    newChoreDueDate,
    dueDateEdited,
    memberSelected
  };
};

export default connect(
  mapStateToProps,
  { createChoreName, createNewChore, createChoreNote }
)(IndividualList);
