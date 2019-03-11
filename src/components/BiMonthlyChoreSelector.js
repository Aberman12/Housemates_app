import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Picker } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { setChoreType } from '../actions';
import { Switch } from 'react-native-switch';

class BiMonthlyChoreSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <View>
        <Switch
          value={true}
          onValueChange={val => console.log(val)}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={30}
          barHeight={1}
          circleBorderWidth={3}
          backgroundActive={'green'}
          backgroundInactive={'gray'}
          circleActiveColor={'#30a566'}
          circleInActiveColor={'#000000'}
          changeValueImmediately={true}
          changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
          innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }} // style for inner animated circle for what you (may) be rendering inside the circle
          outerCircleStyle={{}} // style for outer animated circle
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={2}
        />

        <Text>hello</Text>
        <Picker selectedValue={'java'} style={{ height: 100, width: 100 }}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = ({ groupReducer }) => {
  const { choreType } = groupReducer;
  return { choreType };
};

export default connect(
  mapStateToProps,
  { setChoreType }
)(BiMonthlyChoreSelector);
