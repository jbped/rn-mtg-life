import { Appbar } from 'react-native-paper';

export default function NavBar({ back, navigation, route }) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}
