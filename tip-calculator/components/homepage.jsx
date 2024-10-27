import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import AddTips from './AddTips'
import { useFonts } from "expo-font"
import { LinearGradient } from 'expo-linear-gradient'

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




  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['rgba(183,72,102,0.8)', 'transparent']}
        style={styles.background}
        />
      <View style={styles.displayContainer}>
        <View style={styles.display}>
          <View style={styles.displayTotal}>
            <Text style={styles.words}>
              Welcome!
            </Text>
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
    width: 200,
    height: 50,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
  




})
