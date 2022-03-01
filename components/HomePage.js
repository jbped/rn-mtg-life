import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title='One Player'
        onPress={() => navigation.navigate('One Player Health')}
      />
    </View>
  );
}
