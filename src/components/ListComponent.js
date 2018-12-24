import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Note from "./SmallerListComponent";
import { ListModal } from "./common";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [
        {
          date: "12/12/18",
          note: "Weekly",
          warningColor: "green",
          chores: ["clean room", "go to bed", "go to store"]
        },
        {
          date: "December",
          note: "Monthly",
          warningColor: "green",
          chores: []
        },
        {
          date: "12/12/18",
          note: "Jon's Chores",
          warningColor: "green",
          chores: []
        },
        {
          date: "12/12/18",
          note: "Cindy's Chores",
          warningColor: "green",
          chores: []
        }
      ],
      noteText: "",
      showModal: false
    };
  }

  onAccept() {
    this.setState({ showModal: false });
    this.addNote();
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onChangeTextFunc(noteText) {
    console.log(this.state.noteText);
    this.setState({ noteText });
  }

  render() {
    let notes = this.state.noteArray.map((val, key) => {
      //   console.log("heres key: ", key, "heres val: ", val);
      return (
        <Note
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteNote(key, val)}
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
  addNote() {
    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArray.push({
        date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(),
        note: this.state.noteText,
        warningColor: "green",
        chores: []
      });
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: "" });
    }
  }
  deleteNote(key, val) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray });
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

export default List;
