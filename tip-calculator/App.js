import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTips from './components/AddTips.jsx';
import Login from './components/Login.jsx'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useEffect, useState} from 'react'

export default function App() {
  const auth = getAuth()
  const [userExists, setUserExists] = useState(false)
  const [user, setUser] = useState("")

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserExists(true)
        setUser(user)
      }
      else {
        setUserExists(false)
      }
    })

  })
 

  return (
    <View style={styles.container}>
      {userExists ? (
        <AddTips/>
        ) : (
        <Login/>
      )}      
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
