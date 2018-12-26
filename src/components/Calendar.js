import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
const workout = { key: "workout", color: "green" };

class CalendarApp extends Component {
  goToAgenda() {
    Actions.agenda();
  }
  render() {
    return (
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          console.log("now these months are visible", months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={6}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={6}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        onDayPress={this.goToAgenda.bind(this)}
        style={{ marginTop: 65 }}
        markingType={"simple"}
        markedDates={{
          "2018-12-25": {
            dots: [vacation, massage, workout],
            selected: true,
            selectedColor: "red"
          },
          "2018-12-26": { dots: [massage, workout], disabled: true }
        }}
        markingType={"multi-dot"}
      />
    );
  }
}

export default CalendarApp;
