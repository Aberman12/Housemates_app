import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import ReduxThunk from "redux-thunk";
import reducers from "./reducers";
import Router from "./Router";

class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBM3XPuZ4SPI_cBjyqF3_hUooM0AGcx3_k",
      authDomain: "housemates-9f3f7.firebaseapp.com",
      databaseURL: "https://housemates-9f3f7.firebaseio.com",
      projectId: "housemates-9f3f7",
      storageBucket: "housemates-9f3f7.appspot.com",
      messagingSenderId: "929817228975"
    };
    firebase.initializeApp(config);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        Actions.main({ type: "reset" });
      }
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
