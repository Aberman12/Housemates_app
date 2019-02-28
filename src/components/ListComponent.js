import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  nameNewChoresList,
  createNewChoresList,
  deleteChoresList,
  choresFetch,
  hideChoreEditModal,
  deleteChore,
  changeChoreDate,
  showChoreEditModal
} from '../actions';
import Note from './SmallerListComponent';
import { ListModal } from './common';
import EditChoreModal from './EditChoreModal';

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

  showModal(chore) {
    console.log('right now: ', chore);
    this.props.showChoreEditModal(chore);
  }

  onAccept() {
    if (this.props.newChoreListName) {
      this.props.createNewChoresList(this.props);
      this.setState({ showModal: false });
    } else {
      Alert.alert('Please fill in all information');
    }
  }

  onDecline() {
    this.props.hideChoreEditModal();
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
          onAccept={this.onAccept.bind(this)}
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
      if (val.chores[i].warningColor === 'gold' && determiningColor < 1) {
        determiningColor = 1;
      } else if (val.chores[i].warningColor === 'red' && determiningColor < 2) {
        determiningColor = 2;
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

  mainWarningColorFunc(val) {
    for (var i = 0; i < val.chores.length; i++) {
      let date = new Date();
      let choreDate = Number(val.chores[i].dueDate.slice(-2));

      if (!val.chores[i].done) {
        if (choreDate <= date.getDate()) {
          if (choreDate === date.getDate()) {
            val.chores[i].warningColor = 'gold';
            val.warningColor = this.coordinateListWarningColor(val);
          } else if (choreDate < date.getDate()) {
            val.chores[i].warningColor = 'red';
            val.warningColor = this.coordinateListWarningColor(val);
          }
        }
      } else {
        val.chores[i].warningColor = 'green';
        val.warningColor = this.coordinateListWarningColor(val);
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
        <ScrollView style={styles.scrollContainer}>{notes}</ScrollView>
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
  const { chores, loading, newChoreListName, choreEditModal, choreSelected } = groupReducer;
  return { chores, loading, newChoreListName, choreEditModal, choreSelected };
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
    showChoreEditModal
  }
)(ChoresComponent);
