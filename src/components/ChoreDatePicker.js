import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { changeChoreDate } from "../actions";

class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "101010"
    };
  }

  onChangeDate(date) {
    this.props.changeChoreDate(date);
  }

  render() {
    return (
      <DatePicker
        style={{ width: 200 }}
        date={this.props.newChoreDueDate || new Date()}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-05-01"
        maxDate="2019-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          // dateIcon: {
          //   position: "absolute",
          //   left: 0,
          //   top: 4,
          //   marginLeft: 0
          // },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={date => {
          this.onChangeDate(date);
        }}
      />
    );
  }
}

const mapStateToProps = ({ groupReducer }) => {
  const { newChoreDueDate } = groupReducer;
  return { newChoreDueDate };
};

export default connect(
  mapStateToProps,
  { changeChoreDate }
)(MyDatePicker);
