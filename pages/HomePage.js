import * as React from 'react';
import { View } from 'react-native';
import { Title, Button } from 'react-native-paper';

export default function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Title>Select One Option</Title>
      <Button
        mode='contained'
        compact
        uppercase={false}
        onPress={() => navigation.navigate('One Player Health')}
      >
        One Player
      </Button>
    </View>
  );
}
