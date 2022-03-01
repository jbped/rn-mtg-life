import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Page Components
import HomePage from './components/HomePage';
import OnePlayerHealth from './components/OnePlayerHealth';

// Components
import NavBar from './components/NavBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          header: (props) => <NavBar {...props} />,
        }}
      >
        <Stack.Screen name='Home' component={HomePage} />
        <Stack.Screen name='One Player Health' component={OnePlayerHealth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
