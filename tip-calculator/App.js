import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { readTable } from './database/readTable'
import { writeTable } from './database/writeTable'

export default function App() {
  return (
    <View style={styles.container}>
      <Text></Text>
      <Button 
        onPress = {writeTable(data)}
        title = "CLICK ME"
        color = "#000"

      />
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
