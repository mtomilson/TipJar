import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AddTips from './components/AddTips.jsx';
import Login from './components/Login.jsx'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import HomePage from './components/HomePage.jsx'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export default function App() {
  const auth = getAuth()
  const [userExists, setUserExists] = useState(false)
  const [user, setUser] = useState("")

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserExists(true)
        setUser(user)
      }
      else {
        setUserExists(false)
      }
    })

  })


  return (

    userExists ? (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = "home-outline"


              } else if (route.name === 'AddTips') {
                iconName = "add-circle-outline"
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#85C7F2',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="AddTips" component={AddTips} />
        </Tab.Navigator>
      </NavigationContainer>
    )
      :
     ( <View style={styles.container}>
        <Login />
      </View> )

    




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
