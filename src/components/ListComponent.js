import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  nameNewChoresList,
  createNewChoresList,
  deleteChoresList,
  choresFetch
} from "../actions";
import Note from "./SmallerListComponent";
import { ListModal } from "./common";

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

  // componentWillReceiveProps(newProps) {
  //   console.log("recieved new props", newprops);
  //   this.props.chores = newProps.chores;
  // }

  onAccept() {
    if (this.props.newChoreListName) {
      this.props.createNewChoresList(this.props);
      this.setState({ showModal: false });
    } else {
      Alert.alert("Please fill in a name for your list");
    }
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onChangeTextFunc(noteText) {
    this.props.nameNewChoresList(noteText);
  }

  deleteNote(val) {
    this.props.deleteChoresList(val);
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
        {/* <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="note"
            onChangeText={noteText => this.setState({ noteText })}
            value={this.state.noteText}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View> */}
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
      </View>
    );
  }
  // addNote() {
  // if (this.state.noteText) {
  //   var d = new Date();
  //   this.state.noteArray.push({
  //     date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
  //     note: this.state.noteText,
  //     warningColor: "green",
  //     chores: []
  //   });
  // }
  // }
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
  const { chores, loading, newChoreListName } = groupReducer;
  return { chores, loading, newChoreListName };
};

export default connect(
  mapStateToProps,
  {
    nameNewChoresList,
    createNewChoresList,
    deleteChoresList,
    choresFetch
  }
)(ChoresComponent);
