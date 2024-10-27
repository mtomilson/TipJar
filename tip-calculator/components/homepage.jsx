import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import AddTips from './AddTips'
import { useFonts } from "expo-font"
import { LinearGradient } from 'expo-linear-gradient'
import { doc, getDoc, getFirestore } from '@firebase/firestore'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import {
  Poppins_800ExtraBold_Italic,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light,
  Poppins_500Medium
} from "@expo-google-fonts/poppins"


export default function HomePage() {
  const [fontsLoaded] = useFonts({
    Poppins_800ExtraBold_Italic,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_500Medium
  })

  const [userID, setUserID] = useState("")
  const [userData, setUserData] = useState({})
  const [name, setName] = useState("")

  const db = getFirestore()
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserID(user.uid)
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        try {
          const userDocRef = doc(db, userID, "Information");
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data())
            setName(docSnap.data().name)

          } else {
            console.log("Error: Document not found");
          }
        } catch (error) {
          console.log("Error fetching document:", error);
        }
      }
    };
    fetchData()

  }, [userID])


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(183,72,102,0.8)', 'transparent']}
        style={styles.background}
      />
      <View style={styles.displayContainer}>
        <View style={styles.display}>

          <View style={styles.displayTotal}>
            <View>
              <Text style={styles.words}>
                Welcome, {name}!
              </Text>
            </View>
            <View>
              <Text style={styles.words}>
                Total Tips: !
              </Text>
            </View>


          </View>

        </View>


      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  display: {
    borderWidth: 1.5,
    borderColor: "black",
    width: 340,
    height: 200,
    justifyContent: 'left',
    alignItems: 'left',
    padding: 8,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 15,

  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  words: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",

  },

  displayContainer: {
    height: 700,
    width: 350,
    alignItems: 'center',
    justifyContent: 'top',


  },
  displayTotal: {
    justifyContent: 'center',
    //alignItems: 'center',
    width: 'auto',
    height: 'auto',
    paddingVertical: 10,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },





})
