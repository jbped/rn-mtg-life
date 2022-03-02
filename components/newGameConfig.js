import { useState } from 'react';
import { Title, Card, Paragraph, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewGameConfig({ playerCount }) {
  const [matchSettings, setMatchSettings] = useState({
    startingHealth: 20,
  });

  const updateMatchSettings = ({ settingType, updatedValue }) => {
    switch (settingType) {
      case 'healthButton':
        updatedValue <= 1 ? (updatedValue = 1) : updatedValue;
        updatedValue === 6 && matchSettings.startingHealth === 1
          ? (updatedValue = 5)
          : updatedValue;
        setMatchSettings({
          ...matchSettings,
          startingHealth: updatedValue,
        });
        console.log('health edit: ', matchSettings);
        break;
      case 'healthManual':
        setMatchSettings({
          ...matchSettings,
          startingHealth: updatedValue.replace(/[^0-9]/g, ''),
        });
        break;
      default:
        console.log(matchSettings);
    }
  };

  const checkHealthValue = () => {
    if (!matchSettings.startingHealth || matchSettings.startingHealth < 1) {
      setMatchSettings({
        ...matchSettings,
        startingHealth: 20,
      });
    }
  };

  return (
    <div>
      <Title>Match Settings</Title>
      <Card>
        <Card.Title title='Starting Health' />
        <Card.Content>
          <Paragraph>
            Select{' '}
            {playerCount === 1
              ? 'your starting health '
              : 'the starting health for all players '}
            from the options below:
          </Paragraph>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onPress={() =>
                updateMatchSettings({
                  settingType: 'healthButton',
                  updatedValue: 20,
                })
              }
            >
              20
            </Button>
            <Button
              onPress={() =>
                updateMatchSettings({
                  settingType: 'healthButton',
                  updatedValue: 30,
                })
              }
            >
              30
            </Button>
            <Button
              onPress={() =>
                updateMatchSettings({
                  settingType: 'healthButton',
                  updatedValue: 40,
                })
              }
            >
              40
            </Button>
          </div>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() =>
              updateMatchSettings({
                settingType: 'healthButton',
                updatedValue: matchSettings.startingHealth - 5,
              })
            }
          >
            -5
          </Button>
          <TextInput
            label='Health'
            mode='outlined'
            dense
            value={matchSettings.startingHealth}
            onChangeText={(text) =>
              updateMatchSettings({
                settingType: 'healthManual',
                updatedValue: text,
              })
            }
            style={{ width: '80%' }}
            onBlur={() => checkHealthValue()}
          ></TextInput>
          <Button
            onPress={() =>
              updateMatchSettings({
                settingType: 'healthButton',
                updatedValue: matchSettings.startingHealth + 5,
              })
            }
          >
            +5
          </Button>
        </Card.Actions>
      </Card>
    </div>
  );
}
