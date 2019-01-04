import React from "react";
import { Text, View, Modal } from "react-native";
import { CardSection, Button, Input, Card } from "./common";
import DatePicker from "./ChoreDatePicker";
// import RNPickerSelect from "react-native-picker-select";

const ChoreModal = ({
  children,
  visible,
  onAccept,
  onDecline,
  onChangeTextFunc
}) => {
  const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;
  this.state = {
    favColor: "green",
    items: []
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Card style={cardStyle}>
          <CardSection style={cardSectionStyle}>
            <Text style={textStyle}>{children}</Text>
          </CardSection>

          <CardSection>
            <Input
              onChangeText={text => onChangeTextFunc(text)}
              placeholder="list name"
            />
          </CardSection>

          <CardSection>
            <Text>Date Due</Text>
            <DatePicker />
          </CardSection>
          <CardSection>
            <Text>Assign Chore (Optional)</Text>
            {/* <RNPickerSelect
              placeholder={{
                label: "Select a color...",
                value: null,
                color: "#9EA0A4"
              }}
              items={this.state.items}
              onValueChange={value => {
                this.setState({
                  favColor: value
                });
              }}
              onUpArrow={() => {
                this.inputRefs.name.focus();
              }}
              onDownArrow={() => {
                this.inputRefs.picker2.togglePicker();
              }}
              style={{ ...pickerSelectStyles }}
              value={this.state.favColor}
              ref={el => {
                this.inputRefs.picker = el;
              }}
            /> */}
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
    justifyContent: "center"
  },
  cardStyle: {
    borderRadius: 50
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center"
  }
};

export default ChoreModal;
