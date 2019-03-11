import React from 'react';
import { Text, View, Modal, Picker, Content, Item, Label } from 'react-native';
import { CardSection, Button, Input, Card } from './common';
import DatePicker from './ChoreDatePicker';
import WeeklySelector from './WeeklyChoreSelector';
import ChoreTypeSelector from './ChoreTypeSelector';
import BiMonthlyChoreSelector from './BiMonthlyChoreSelector';
import MonthlyChoreSelector from './MonthlyChoreSelector';

const ChoreModal = ({ children, visible, onAccept, onDecline, onChangeTextFunc, props }) => {
  const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;

  const selectChoreDateType = () => {
    if (props === 'none-selected') {
      return <ChoreTypeSelector />;
    }
    if (props === 'weekly') {
      return <WeeklySelector />;
    } else if (props === 'one-time') {
      return (
        <View>
          <Text>Date Due</Text>
          <DatePicker />
        </View>
      );
    } else if (props === 'Bi-monthly') {
      return <BiMonthlyChoreSelector />;
    } else if (props === 'monthly') {
      return <MonthlyChoreSelector />;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
      <View style={containerStyle}>
        <Card style={cardStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>{children}</Text>
          </CardSection>

          <CardSection>
            <Input onChangeText={text => onChangeTextFunc(text)} placeholder="list name" />
          </CardSection>

          <CardSection>{selectChoreDateType()}</CardSection>
          <CardSection>
            <Text>Assign Chore (Optional)</Text>
          </CardSection>

          <CardSection>
            <Button onPress={onDecline}>Back</Button>
            <Button onPress={onAccept}>Create</Button>
          </CardSection>
        </Card>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  cardStyle: {
    borderRadius: 50
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export default ChoreModal;
