import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Page Components
import HomePage from './pages/HomePage';
import OnePlayerHealth from './pages/OnePlayerHealth';

// Components
import NavBar from './components/NavBar';
const Stack = createNativeStackNavigator();

// Customize Theme
const theme = {
  ...DefaultTheme,
};

export default function App() {
  return (
    <PaperProvider theme={theme} dark={true}>
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
    </PaperProvider>
  );
}
