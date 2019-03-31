import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        '2019-03-30': [
          {
            dots: [vacation, massage, workout],
            name: 'this is doay!!!!',
            selectedColor: 'red',
            marked: true
          }
        ]
      }
    };

    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
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
        markingType={'period'}
        markedDates={{
          '2019-03-08': { textColor: '#666' },
          '2019-03-09': { textColor: '#666' },
          '2019-03-14': { startingDay: true, endingDay: true, color: 'blue' },
          '2019-03-21': { startingDay: true, color: 'blue' },
          '2019-03-22': { endingDay: true, color: 'gray' },
          '2019-03-24': { startingDay: true, color: 'gray' },
          '2019-03-25': { color: 'gray' },
          '2019-03-26': { endingDay: true, color: 'gray' }
        }}
        monthFormat={'yyyy'}
        theme={{ agendaKnobColor: 'blue' }}
        // renderDay={(day, item) => (item = <Text>hello</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = Math.floor(Math.random() * 5);
      //     for (let j = 0; j < numItems; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime,
      //         height: Math.max(50, Math.floor(Math.random() * 150))
      //       });
      //     }
      //   }
      // }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        console.log('heres dates and stuff', this.state.items[key]);
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

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
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
