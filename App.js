import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import * as firebase from 'firebase';
import 'firebase/firestore';

let db;

async function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyC1hxAPgPGL4ELKazF5YA3K1mkM1RdMG6o',
    authDomain: 'rockpaperscissors-cb169.firebaseapp.com',
    databaseURL: 'https://rockpaperscissors-cb169.firebaseio.com',
    projectId: 'rockpaperscissors-cb169',
    storageBucket: 'rockpaperscissors-cb169.appspot.com',
  };
  const firebaseApp = await firebase.initializeApp(firebaseConfig);
  console.log(firebaseApp);
  db = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  db.settings(settings);
}
initFirebase();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  componentDidMount() {
    // function googleLogin() {
    //   const provider = new firebase.auth.GoogleAuthProvider();

    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then(result => {
    //       const user = result.user;
    //       // document.write(`Hello ${user.displayName}`);
    //       console.log(user.uid);

    //       //insert into firebase
    //       const data = {
    //         name: user.displayName,
    //         friends: [],
    //         gameHistory: [],
    //       };

    //       db.collection('users')
    //         .doc(user.uid)
    //         .set(data);
    //     });
    // }
    const usersRef = db.collection('users');

    usersRef.get().then(users => {
      users.forEach(user => {
        console.log(user.data());
      });
    });
  }
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
