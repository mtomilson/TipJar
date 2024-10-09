import React from 'react'
import { Text, SafeAreaView, StyleSheet, View, TextInput} from 'react-native'
import {useFonts} from "expo-font"
import { Poppins_800ExtraBold_Italic, Poppins_400Regular, Poppins_600SemiBold} from "@expo-google-fonts/poppins"
import {useState} from 'react'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [fontsLoaded] = useFonts({
        Poppins_800ExtraBold_Italic,
        Poppins_400Regular,
        Poppins_600SemiBold
    })
    if(!fontsLoaded) {
        return <Text>
            loading...
        </Text>
    }


  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
            <Text style={styles.poppins}>Tip Jar</Text>
            <TextInput 
            placeholder='Email' 
            style={styles.emailBox}
            value={email}
            onChangeText={setEmail}/>

            <TextInput 
            placeholder='Password' 
            style={styles.passwordBox}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />
                
            
        </View>
    </SafeAreaView>
        
      )
}

const styles = StyleSheet.create({
    poppins: {
      fontSize: 30,
      fontFamily: "Poppins_600SemiBold",
      textAlign: 'center',
      padding: 50,
    },
    textStyle: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        padding: 50
        
    },
    emailBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    passwordBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    container: {
        //justifyContent: 'center',
        backgroundColor: 'white',
        height: 500,
        width: 300,
        borderRadius: 15,

    },
   




})
