import React from 'react';
import { View, Button, Text } from 'react-native';

export default class PlayerInList extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#FDD7E4',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'center',
        }}
      >
        <Text>Player Name</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="rock">Rock</Button>
          <Button title="paper">Paper</Button>
          <Button title="scissors">Scissors</Button>
        </View>
      </View>
    );
  }
}
