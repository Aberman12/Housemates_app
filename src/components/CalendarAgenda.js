import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { setSelectedCalendarDate } from '../actions';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      showModal: false
    };
  }

  componentWillMount() {
    console.log(this.props.customCalendarEventItems);
    this.setState({ items: this.props.customCalendarEventItems });
  }

  render() {
    return (
      <Agenda
        style={{ marginTop: 65 }}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          // this.state.items[strTime].push({
          //   name: 'Item for ' + strTime,
          //   height: 67
          // });
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  createCalendarEvent(d) {
    d = d.toString();
    var date = new Date(d);
    let month;
    let day;

    if ((date.getMonth() + 1).toString().length === 1) {
      month = '0' + (date.getMonth() + 1).toString();
    } else {
      month = (date.getMonth() + 1).toString();
    }

    if (date.getUTCDate().toString().length === 1) {
      day = '0' + date.getUTCDate().toString();
    } else {
      day = date.getUTCDate().toString();
    }

    d = `${date.getFullYear()}-${month}-${day}`;

    this.props.setSelectedCalendarDate(d);
    Actions.CalendarEventCreatorPage();
  }

  renderEmptyDate(thing) {
    return (
      <TouchableOpacity onPress={() => this.createCalendarEvent(thing['0'])}>
        <View style={[styles.item, { height: 67 }]}>
          <Text>Date empty</Text>
        </View>
      </TouchableOpacity>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const mapStateToProps = ({ CalendarReducer }) => {
  const { customCalendarEventItems } = CalendarReducer;
  return { customCalendarEventItems };
};

export default connect(
  mapStateToProps,
  { setSelectedCalendarDate }
)(AgendaScreen);
