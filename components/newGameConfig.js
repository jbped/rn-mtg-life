import { useState } from 'react';
import { Title, Card, Paragraph, Button, TextInput } from 'react-native-paper';
import Dropdown from 'react-native-paper-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewGameConfig({ playerCount }) {
  const [matchSettings, setMatchSettings] = useState({
    selectedFormat: 'standard',
    startingHealth: 20,
  });

  const [showDropDown, setShowDropDown] = useState(false);

  // Format options
  const mtgFormatOptions = [
    {
      label: 'Standard',
      value: 'standard',
    },
    {
      label: 'Commander',
      value: 'commander',
    },
    {
      label: 'Modern',
      value: 'modern',
    },
    {
      label: 'Historic',
      value: 'historic',
    },
  ];

  // Starting options for health pool, mapped over to render buttons for each option
  const startingHealthOptions = [20, 30, 40];

  // Function that handles updating matchSettings state through switch options
  const updateMatchSettings = ({ settingType, updatedValue }) => {
    console.log(settingType, updatedValue);
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
          startingHealth: updatedValue.replace(/[^0-9]/g, ''), //RegEx prevents any non-numeric character from being entered.
        });
        break;
      case 'updateFormat':
        setMatchSettings({
          ...matchSettings,
          selectedFormat: updatedValue,
        });
        console.log(matchSettings);
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
        <Card.Title title='Match Format' />
        <Card.Content>
          <Paragraph>
            Select the match format (Standard, Modern, Commander, etc.) from the
            dropdown below:
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Dropdown
            label={'MTG Format'}
            mode={'outlined'}
            visible={showDropDown}
            dense={true}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            list={mtgFormatOptions}
            value={matchSettings.selectedFormat}
            setValue={(format) =>
              updateMatchSettings({
                settingType: 'updateFormat',
                updatedValue: format,
              })
            }
          ></Dropdown>
        </Card.Actions>
      </Card>
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
            disabled={matchSettings.startingHealth === 1}
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
