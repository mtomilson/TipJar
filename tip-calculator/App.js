import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTips from './components/AddTips.jsx';
import Login from './components/Login.jsx'


export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1D1D1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
