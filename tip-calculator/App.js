import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import Login from './components/Login.jsx'
import ViewTips from './components/ViewTips.jsx'

export default function App() {
  return (
    <View style={styles.container}>
      <ViewTips/>
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
