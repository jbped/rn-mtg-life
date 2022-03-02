import { useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Imported Components
import NewGameConfig from '../components/NewGameConfig';
import OnePlayerView from '../components/OnePlayerView';

export default function OnePlayerHealth({ navigation }) {
  const [gameData, setGameData] = useState({});

  const getGameData = async () => {
    try {
      const data = await AsyncStorage.getItem('@onePlayer');
      data && setGameData(data);
    } catch (e) {
      console.error(e);
    }
  };

  getGameData();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {gameData.length > 1 ? (
        <OnePlayerView gameType={gameData.gameType} />
      ) : (
        <NewGameConfig playerCount={1} />
      )}
    </View>
  );
}
