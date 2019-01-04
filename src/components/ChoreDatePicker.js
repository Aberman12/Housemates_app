import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { createChoreDate } from "../actions";

class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "101010"
    };
  }
  render() {
    return (
      <DatePicker
        style={{ width: 200 }}
        date={new Date()}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          //   dateIcon: {
          //     position: "absolute",
          //     left: 0,
          //     top: 4,
          //     marginLeft: 0
          //   },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={date => {
          this.props.createChoreDate(date);
        }}
      />
    );
  }
}

const mapStateToProps = ({ groupReducer }) => {
  const { newChoreDate } = groupReducer;
  return { newChoreDate };
};

export default connect(
  mapStateToProps,
  { createChoreDate }
)(MyDatePicker);
