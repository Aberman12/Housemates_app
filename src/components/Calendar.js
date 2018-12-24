import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

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
          "2018-12-28": {
            customStyles: {
              container: {
                backgroundColor: "green"
              },
              text: {
                color: "black",
                fontWeight: "bold"
              }
            }
          },
          "2018-12-29": {
            customStyles: {
              container: {
                backgroundColor: "white",
                elevation: 2
              },
              text: {
                color: "blue"
              }
            }
          }
        }}
      />
    );
  }
}

export default CalendarApp;
