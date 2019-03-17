import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, TouchableHighlight, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import CheckBox from 'react-native-check-box';
import { connect } from 'react-redux';
import {
  showChoreEditModal,
  hideChoreEditModal,
  createNewChoresList,
  nameNewChoresList,
  deleteChoresList,
  deleteChore,
  changeDone
} from '../actions';
import EditChoreModal from './EditChoreModal';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this.markChoreAsDone.bind(this);
  }

  componentDidMount() {
    console.log('inside list: ', this.props.chore.warningColor, this.props.chore.done);
    this.setState({ isChecked: this.props.chore.done });
  }

  showModal(chore) {
    if (typeof chore === 'object') {
      this.props.showChoreEditModal(chore);
    }
  }

  markChoreAsDone(chore, isChecked) {
    if (chore.type === 'one-time') {
      chore.done = !chore.done;
    } else if (chore.type === 'weekly') {
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';

      var n = d.getDay();
      let selectDays = new Array(7);
      let beforeSelectDays = [];
      let deciferIfChoreCompletedInAdvance = true;
      for (let day in chore.dueDate.done) {
        if (chore.dueDate[day] === '#89cff0') {
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
      chore.done = isChecked;
      for (var i = 0; i < weekday.length; i++) {
        if (selectDays.includes(weekday[i]) && i <= n && isChecked) {
          if (!chore.dueDate.done[weekday[i]]) {
            chore.dueDate.done[weekday[i]] = true;
          }
        } else if (selectDays.includes(weekday[i]) && i <= n && !isChecked) {
          for (var j = selectDays.length - 1; j >= 0; j--) {
            if (chore.dueDate.done[selectDays[j]]) {
              chore.dueDate.done[selectDays[j]] = false;
              break;
            }
          }
          break;
        } else if (i > n && !chore.dueDate.done[weekday[i]] && !isChecked) {
          console.log('something hit this area');
        } else if (i > n && chore.dueDate.done[weekday[i]] && isChecked) {
          console.log('part3');
          for (var j = selectDays.length - 1; j <= 0; j--) {
            if (!chore.dueDate.done[selectDays[j]]) {
              chore.dueDate.done[selectDays[j]] = true;
              break;
            }
          }
        }
      }
    } else if (chore.type === 'monthly') {
      chore.done = !chore.done;
    } else if (chore.type === 'Bi-monthly') {
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';
      var d = new Date(),
        month = d.getMonth(),
        daysOfMonth = [],
        dateVariable = weekday.indexOf(chore.dueDate.date);
      d.setDate(dateVariable);

      // Get the first Monday in the month
      while (d.getDay() !== dateVariable) {
        d.setDate(d.getDate() + 1);
      }

      // Get all the other daysOfMonth in the month
      while (d.getMonth() === month) {
        var day = new Date(d.getTime());
        daysOfMonth.push(day.getDate());
        d.setDate(d.getDate() + 7);
      }

      if (chore.dueDate.offSet) {
        daysOfMonth = [daysOfMonth[0], daysOfMonth[2]];
      } else {
        daysOfMonth = [daysOfMonth[1], daysOfMonth[3]];
      }

      if (!chore.dueDate.offSetDoneStatus.one) {
        chore.dueDate.offSetDoneStatus.one = true;
        chore.done = true;
      }
    } else if (chore.dueDate.offSetDoneStatus.one && !chore.dueDate.offSetDoneStatus.two) {
      chore.dueDate.offSetDoneStatus.two = true;
      chore.done = true;
    }
    this.props.changeDone(chore);
  }

  onChangeTextFunc(noteText) {
    this.props.nameNewChoresList(noteText);
  }

  deleteNote(val) {
    // console.log("right now:", this.props);
    // this.props.deleteChoresList(val, this.props.chores);
  }

  onDeleteChore() {
    // this.props.deleteChore(this.props.choreSelected);
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
                  justifyContent: 'center'
                }}
                onPress={() => this.showModal(this.props.chore)}
              >
                {this.props.chore.note}
              </Text>
              <CheckBox
                style={{
                  // flex: 1,
                  padding: 10,
                  // marginRight: 10,
                  paddingLeft: 20
                }}
                checkBoxColor={this.props.chore.warningColor}
                onClick={() => {
                  this.markChoreAsDone(this.props.chore, !this.state.isChecked);
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                }}
                isChecked={this.state.isChecked}
              />
            </CardSection>
          </View>
        </TouchableWithoutFeedback>

        {this.showModal()}
      </View>
    );
  }
}

const mapStateToProps = ({ groupReducer }) => {
  const { choreEditModal, currentlySelected } = groupReducer;
  return { choreEditModal, currentlySelected };
};

export default connect(
  mapStateToProps,
  {
    showChoreEditModal,
    hideChoreEditModal,
    createNewChoresList,
    nameNewChoresList,
    deleteChoresList,
    deleteChore,
    changeDone
  }
)(ListItem);
