import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
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
  }

  componentDidMount() {
    // let date = new Date();
    // let choreDate = Number(this.props.chore.dueDate.slice(-2));
    // if (!this.props.chore.done) {
    //   console.log('heres if theyre done: ', this.props.chore.done);
    //   if (choreDate >= date.getDate()) {
    //     if (choreDate === date.getDate()) {
    //       this.props.chore.warningColor = 'gold';
    //     } else {
    //       this.props.chore.warningColor = 'red';
    //     }
    //   }
    // } else {
    //   this.props.chore.warningColor = 'green';
    // }

    this.setState({ isChecked: this.props.chore.done });
  }

  showModal(chore) {
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

  markChoreAsDone(chore) {
    this.props.changeDone(chore);
  }

  onDecline() {
    this.props.hideChoreEditModal();
    this.setState({ showModal: false });
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
                  this.setState({
                    isChecked: !this.state.isChecked
                  });
                  this.markChoreAsDone(this.props.chore);
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
