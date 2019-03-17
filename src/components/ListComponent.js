import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import {
  nameNewChoresList,
  createNewChoresList,
  deleteChoresList,
  choresFetch,
  hideChoreEditModal,
  deleteChore,
  changeChoreDate,
  showChoreEditModal,
  saveNewListChanges
} from '../actions';
import Note from './SmallerListComponent';
import { ListModal } from './common';
import EditChoreModal from './EditChoreModal';
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
const fillinDate = `${year}-${month}-${day}`;

class ChoresComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
      showModal: false
    };
  }

  componentDidMount() {
    if (this.props.chores.length === 0) {
      this.props.choresFetch();
    }
  }

  onAccept() {
    if (this.props.newChoreListName) {
      this.props.createNewChoresList(this.props);
      this.setState({ showModal: false });
    } else {
      Alert.alert('Please fill in all information');
    }
  }

  saveListChanges() {
    var choreInQuestion = this.props.choreSelected;
    if (this.props.newChoreListName !== '') {
      choreInQuestion.note = this.props.newChoreListName;
    }
    if (this.props.newChoreDueDate !== fillinDate || this.props.dueDateEdited) {
      if (fillinDate[5] === '0') {
        fillinDate.slice(5, 1);
      }
      choreInQuestion.dueDate = this.props.newChoreDueDate;
    }

    this.props.saveNewListChanges(choreInQuestion);
  }

  onDecline() {
    this.props.hideChoreEditModal();
    this.setState({ showModal: false });
  }

  onChangeTextFunc(noteText) {
    this.props.nameNewChoresList(noteText);
  }

  deleteNote(val) {
    this.props.deleteChoresList(val, this.props.chores);
  }

  onDeleteChore() {
    Alert.alert(
      `Are you sure you wish to delete`,
      ` ${this.props.choreSelected.note}?`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteChore(this.props.choreSelected, this.props.chores);
          }
        }
      ],
      { cancelable: false }
    );
  }

  displayChoreEditModal() {
    if (this.props.choreEditModal && this.props.choreSelected !== undefined) {
      return (
        <EditChoreModal
          visible={this.props.choreEditModal}
          onAccept={this.saveListChanges.bind(this)}
          onDecline={this.onDecline.bind(this)}
          onChangeTextFunc={this.onChangeTextFunc.bind(this)}
          props={this.props}
          onDelete={this.onDeleteChore.bind(this)}
        >
          Edit Chore
        </EditChoreModal>
      );
    }
  }

  coordinateListWarningColor(val) {
    let determiningColor = 0;

    for (var i = 0; i < val.chores.length; i++) {
      if (!val.chores[i].done) {
        if (val.chores[i].warningColor === 'gold' && determiningColor < 1) {
          determiningColor = 1;
        } else if (val.chores[i].warningColor === 'red' && determiningColor < 2) {
          determiningColor = 2;
        }
      }
    }
    if (determiningColor === 0) {
      return 'green';
    } else if (determiningColor === 1) {
      return 'gold';
    } else if (determiningColor === 2) {
      return 'red';
    }
  }

  getMondays(input) {
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
      dateVariable = weekday.indexOf(input.date);

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

    if (input.offSet) {
      daysOfMonth = [daysOfMonth[1], daysOfMonth[3]];
    } else {
      daysOfMonth = [daysOfMonth[0], daysOfMonth[2]];
    }
    console.log(daysOfMonth);
    return daysOfMonth;
  }

  mainWarningColorFunc(val) {
    if (!val.chores.length) {
      val.warningColor = 'green';
    } else {
      for (var i = 0; i < val.chores.length; i++) {
        console.log('first on listmannyyy: ', val.chores[i]);
        let getInitialDate = new Date();
        let date = getInitialDate.setHours(0, 0, 0, 0);
        let choreDate = new Date(val.chores[i].dueDate).setHours(0, 0, 0, 0);
        var selectDays = [];
        var weeklyDueDate;
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
        let doneStatus;
        let beforeSelectDays = [];
        let dateOfMonth = d.getDate();
        var daysOfMonthBeforeOffset;
        var daysOfMonthAfterOffset;
        if (val.chores[i].type === 'one-time') {
          if (!val.chores[i].done) {
            if (choreDate <= date) {
              if (choreDate === date) {
                val.chores[i].warningColor = 'gold';
                val.warningColor = this.coordinateListWarningColor(val);
              } else if (choreDate < date) {
                val.chores[i].warningColor = 'red';
                val.warningColor = this.coordinateListWarningColor(val);
              }
            } else {
              val.chores[i].warningColor = 'green';
              val.warningColor = this.coordinateListWarningColor(val);
            }
          } else {
            val.chores[i].warningColor = 'green';
            val.warningColor = this.coordinateListWarningColor(val);
          }
        } else if (val.chores[i].type === 'weekly') {
          weeklyDueDate = val.chores[i].dueDate;
          doneStatus = val.chores[i].dueDate.done;
          let thisChoreI = val.chores[i];
          let stuffstuff = false;
          console.log('chores: ', val.chores[i]);
          for (let day in weeklyDueDate) {
            if (weeklyDueDate[day] === '#89cff0') {
              beforeSelectDays.push(day);
            }
          }

          for (var m = 0; m < beforeSelectDays.length; m++) {
            if (beforeSelectDays[m] === 'sunday') {
              selectDays[0] = 'sunday';
            }
            if (beforeSelectDays[m] === 'monday') {
              selectDays[1] = 'monday';
            }
            if (beforeSelectDays[m] === 'tuesday') {
              selectDays[2] = 'tuesday';
            }
            if (beforeSelectDays[m] === 'wednesday') {
              selectDays[3] = 'wednesday';
            }
            if (beforeSelectDays[m] === 'thursday') {
              selectDays[4] = 'thursday';
            }
            if (beforeSelectDays[m] === 'friday') {
              selectDays[5] = 'friday';
            }
            if (beforeSelectDays[m] === 'saturday') {
              selectDays[6] = 'saturday';
            }
          }

          for (var j = 0; j < weekday.length; j++) {
            console.log(
              'neweste: ',
              selectDays.includes(weekday[j]),
              !doneStatus[weekday[j]],
              thisChoreI
            );
            if (selectDays.includes(weekday[j]) && !doneStatus[weekday[j]]) {
              if (n === j) {
                console.log('made it t gold', thisChoreI);
                thisChoreI.warningColor = 'gold';
                stuffstuff = true;
                console.log(stuffstuff);
                val.warningColor = this.coordinateListWarningColor(val);
              } else if (n > j) {
                console.log('made it t red', thisChoreI);
                thisChoreI.warningColor = 'red';
                stuffstuff = true;
                console.log(stuffstuff);
                val.warningColor = this.coordinateListWarningColor(val);
              } else {
                console.log('made it t gree', thisChoreI);
                thisChoreI.warningColor = 'green';
                val.warningColor = this.coordinateListWarningColor(val);
              }
            }
          }
          if (!stuffstuff) {
            console.log('made it tostuff', stuffstuff);
            thisChoreI.warningColor = 'green';
            val.warningColor = this.coordinateListWarningColor(val);
          }
        } else if (val.chores[i].type === 'monthly') {
          if (val.chores[i].done) {
            val.chores[i].warningColor = 'green';
            val.warningColor = this.coordinateListWarningColor(val);
          } else {
            if (dateOfMonth === val.chores[i].dueDate) {
              val.chores[i].warningColor = 'gold';
              val.warningColor = this.coordinateListWarningColor(val);
            } else if (dateOfMonth > val.chores[i].dueDate) {
              val.chores[i].warningColor = 'red';
              val.warningColor = this.coordinateListWarningColor(val);
            } else {
              val.chores[i].warningColor = 'green';
              val.warningColor = this.coordinateListWarningColor(val);
            }
          }
        } else if (val.chores[i].type === 'Bi-monthly') {
          daysOfMonthBeforeOffset = this.getMondays(val.chores[i].dueDate);
          console.log(daysOfMonthBeforeOffset[0], dateOfMonth);
          if (
            dateOfMonth === daysOfMonthBeforeOffset[0] ||
            dateOfMonth === daysOfMonthBeforeOffset[1]
          ) {
            console.log('made ithere');
            val.chores[i].warningColor = 'gold';
            val.warningColor = this.coordinateListWarningColor(val);
          } else if (
            (dateOfMonth > daysOfMonthBeforeOffset[0] &&
              !val.chores[i].dueDate.offSetDoneStatusOne) ||
            (dateOfMonth > daysOfMonthBeforeOffset[1] && !val.chores[i].dueDate.offSetDoneStatusTwo)
          ) {
            val.chores[i].warningColor = 'red';
            val.warningColor = this.coordinateListWarningColor(val);
          } else {
            val.chores[i].warningColor = 'green';
            val.warningColor = this.coordinateListWarningColor(val);
          }
        }
      }
    }
  }

  render() {
    let notes = this.props.chores.map((val, key) => {
      this.mainWarningColorFunc(val);
      return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(val)} />;
    });
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          // scrollEventThrottle={16}
          style={styles.scrollContainer}
        >
          {notes}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ showModal: true })}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <ListModal
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
          onChangeTextFunc={this.onChangeTextFunc.bind(this)}
        >
          Add New Chores List?
        </ListModal>
        {this.displayChoreEditModal()}
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    marginTop: 65
  },
  scrollContainer: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    marginBottom: 100,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const {
    chores,
    loading,
    newChoreListName,
    choreEditModal,
    choreSelected,
    dueDateEdited,
    newChoreDueDate
  } = groupReducer;
  return {
    chores,
    loading,
    newChoreListName,
    choreEditModal,
    choreSelected,
    dueDateEdited,
    newChoreDueDate
  };
};

export default connect(
  mapStateToProps,
  {
    nameNewChoresList,
    createNewChoresList,
    deleteChoresList,
    choresFetch,
    hideChoreEditModal,
    deleteChore,
    changeChoreDate,
    showChoreEditModal,
    saveNewListChanges
  }
)(ChoresComponent);
