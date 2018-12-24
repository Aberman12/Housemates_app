import React from "react";
import { Text, View, Modal, TextInput } from "react-native";
import { CardSection } from "./CardSection";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";

const ListModal = ({
  children,
  visible,
  onAccept,
  onDecline,
  onChangeTextFunc
}) => {
  const { cardStyle, containerStyle, textStyle, cardSectionStyle } = styles;

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

export { ListModal };
