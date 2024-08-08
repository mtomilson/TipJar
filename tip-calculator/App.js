import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTips from './components/AddTips.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <AddTips />
      <StatusBar style="auto" />
    </View>
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
