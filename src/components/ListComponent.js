import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  nameNewChoresList,
  createNewChoresList,
  deleteChoresList,
  choresFetch,
  hideChoreEditModal,
  deleteChore,
  changeChoreDate
} from "../actions";
import Note from "./SmallerListComponent";
import { ListModal } from "./common";
import EditChoreModal from "./EditChoreModal";

class ChoresComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: "",
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
      Alert.alert("Please fill in all information");
    }
  }

  onDecline() {
    this.props.hideChoreEditModal();
  }

  onChangeTextFunc(noteText) {
    this.props.nameNewChoresList(noteText);
  }

  deleteNote(val) {
    // console.log("right now:", this.props);
    this.props.deleteChoresList(val, this.props.chores);
  }

  onChangeDate(date) {
    this.props.changeChoreDate(date);
  }

  onDeleteChore(choreList) {
    this.props.deleteChore(this.props.choreSelected);
  }

  render() {
    let notes = this.props.chores.map((val, key) => {
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteNote(val)}
        />
      );
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: "stretch",
    color: "#fff",
    padding: 20,
    marginBottom: 100,
    backgroundColor: "#252525",
    borderTopWidth: 2,
    borderTopColor: "#ededed"
  },
  addButton: {
    position: "absolute",
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: "#E91E63",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24
  }
};

const mapStateToProps = ({ groupReducer }) => {
  const {
    chores,
    loading,
    newChoreListName,
    choreEditModal,
    choreSelected
  } = groupReducer;
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
    changeChoreDate
  }
)(ChoresComponent);
