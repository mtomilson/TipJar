import React from 'react'
import { Text, SafeAreaView, StyleSheet, View, TextInput, Image, Button, TouchableOpacity} from 'react-native'
import {useFonts} from "expo-font"
import { Poppins_800ExtraBold_Italic, 
        Poppins_400Regular, 
        Poppins_600SemiBold,
        Poppins_300Light,
        Poppins_500Medium} from "@expo-google-fonts/poppins"
import {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")
    const [uid, setUID] = useState("")
    const [fontsLoaded] = useFonts({
        Poppins_800ExtraBold_Italic,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_300Light,
        Poppins_500Medium
    })
    const auth = getAuth()


    if(!fontsLoaded) {
        return <Text>
            loading...
        </Text>
    }



    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
        })
        .catch((error) =>{
            console.log("Error: ", error)
        })
    }

    const login = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
        }).catch((error) => {
            console.log("error:", error)
        })
    }

  return (
    <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
            <Text style={styles.title}>Tip Jar</Text>

            <Image
            source={require('../assets/images/tips.png')}
            style={styles.tipsImage}
            />


            <Text style={styles.descriptionText}>Email</Text>

            <TextInput 
            placeholder='Email' 
            style={styles.emailBox}
            value={email}
            onChangeText={setEmail}/>

            <Text style={styles.descriptionText}>Password</Text>


            <TextInput 
            placeholder='Password' 
            style={styles.passwordBox}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            />
            
            <View style={styles.buttonRow}>
            <TouchableOpacity
            style={styles.signUpButton} 
            onPress={signUp}
            >
             <Text style={styles.signUpButtonText}>Sign Up</Text>

            </TouchableOpacity>
            
            <TouchableOpacity
            style={styles.loginButton}
            onPress={login}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            </View>

                         
            
        </View>
    </SafeAreaView>
        
      )
}

const styles = StyleSheet.create({
    tipsImage: {
        height: 90,
        width: 120,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
      fontSize: 30,
      fontFamily: "Poppins_600SemiBold",
      textAlign: 'center',
      paddingTop: 25,
      color: '#B74866'
    },
    
    emailBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#636363',
        padding: 10,
    },

    descriptionText: {
        paddingLeft: 13,
        color: '#B74866',
        fontFamily: "Poppins_300Light",
        fontSize: 15,
    },

    passwordBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#636363',
        padding: 10,
    },

    container: {
        //justifyContent: 'center',
        backgroundColor: 'white',
        height: 500,
        width: 300,
        borderRadius: 15,
        marginTop: 100,
    },
    signUpButton: {
        backgroundColor: '#B74866',
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignSelf: 'left',
        margin: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
      },
      
      signUpButtonText: {
        fontFamily: 'Poppins_500Medium', // or whatever font you are using
        fontSize: 15, // Set your desired font size here
        color: 'white',
      },

      loginButton: {
        backgroundColor: '#B74866',
        paddingVertical: 5,
        paddingHorizontal: 5,
        alignSelf: 'right',
        margin: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
      },
      
      loginButtonText: {
        fontFamily: 'Poppins_500Medium', // or whatever font you are using
        fontSize: 15, // Set your desired font size here
        color: 'white',
      },
      
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    
   
   




})
