import { useState } from 'react';
import { Title, Card, Paragraph, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewGameConfig({ playerCount }) {
  const [matchSettings, setMatchSettings] = useState({
    startingHealth: 20,
  });

  // Starting options for health pool, mapped over to render buttons for each option
  const startingHealthOptions = [20, 30, 40];

  // Function that handles updating matchSettings state through switch options
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

  // Checks matchSettings.startingHealth value. If less undefined/null || less than 1 defaults startingHealth to 20
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
            {startingHealthOptions.map((value, index) => (
              <Button
                key={`healthOption-${index}`}
                onPress={() =>
                  updateMatchSettings({
                    settingType: 'healthButton',
                    updatedValue: value,
                  })
                }
              >
                {value}
              </Button>
            ))}
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
