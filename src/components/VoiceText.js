import Voice from 'react-native-voice';
import React, { Component } from 'react';

export default class VoiceTest extends Component {
  constructor(props) {
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }
  onStartButtonPress(e) {
    Voice.start('en-US');
  }
}
