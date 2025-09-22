import React from 'react'
import { Text, SafeAreaView, StyleSheet, View, TextInput, Image, Button, TouchableOpacity } from 'react-native'
import { useFonts } from "expo-font"
import {
    Poppins_800ExtraBold_Italic,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_800ExtraBold
} from "@expo-google-fonts/poppins"
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "@firebase/firestore"
import { LinearGradient } from 'expo-linear-gradient'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user, setUser] = useState("")
    const [uid, setUID] = useState("")
    const [fontsLoaded] = useFonts({
        Poppins_800ExtraBold_Italic,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_300Light,
        Poppins_500Medium,
        Poppins_800ExtraBold
    })
    const [wantToSignUp, setWantToSignUp] = useState(false)
    const auth = getAuth()
    const db = getFirestore()


    if (!fontsLoaded) {
        return <Text>
            loading...
        </Text>
    }

    const totals = {
        totalTips: 0,
        name: name,
    }
    dasds


    const loginAccount = async () => {
        setWantToSignUp(true)
    }

    const createAccount = async () => {
        setWantToSignUp(false)
    }

    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                const userDocRef = doc(db, userCredential.user.uid, "Information")
                setDoc(userDocRef, totals)

            })
            .catch((error) => {
                console.log("Error: ", error)
                return
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
            <LinearGradient
                colors={['rgba(183,72,102,0.8)', 'transparent']}
                style={styles.background}
            />
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/tips.png')}
                    style={styles.tipsImage}
                />
                <Text style={styles.title}>Tip Jar</Text>



                <View style={styles.information}>
                    {!wantToSignUp ? (
                        <>
                            <View>
                                <TextInput
                                    placeholder='First Name'
                                    style={styles.nameBox}
                                    value={name}
                                    onChangeText={setName} 
                                />
                            </View>

                        </>
                    ) : (null)}

                    <View>

                        <TextInput
                            placeholder='Email'
                            style={styles.emailBox}
                            value={email}
                            onChangeText={setEmail} 
                        />
                    </View>

                    <View>
                        <TextInput
                            placeholder='Password'
                            style={styles.passwordBox}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>


                </View>


                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => (!wantToSignUp ? signUp() : login())}>
                        <Text style={styles.loginButtonText}>
                            {!wantToSignUp ? "Sign Up" : "Login"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonRow}>
                    <Text>
                        {!wantToSignUp ? "Already a User?" : "Not a User?"}
                    </Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => (!wantToSignUp ? loginAccount() : createAccount())}>
                        <Text style={styles.loginButtonText}>
                            {!wantToSignUp ? "Login" : "Create an Account"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    
    tipsImage: {
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignSelf: 'center',
        top: 20,
    },

    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    title: {
        fontSize: 30,
        fontFamily: "Poppins_800ExtraBold",
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
        borderRadius: 7,
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
        borderRadius: 7,
    },

    nameBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#636363',
        padding: 10,
        borderRadius: 7,
    },

    container: {
        //justifyContent: 'center',
        backgroundColor: 'white',
        height: 550,
        width: 350,
        borderRadius: 15,
        marginTop: 100,
        borderWidth: 1,
        borderColor: '#B74866',
        bottom: 50
    },

    signUpButton: {
        backgroundColor: '#B74866',
        margin: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 9,
    },

    loginButton: {
        backgroundColor: '#B74866',
        margin: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        paddingHorizontal: 20,
        paddingVertical: 9,
    },

    loginButtonText: {
        fontFamily: 'Poppins_500Medium', // or whatever font you are using
        fontSize: 15, // Set your desired font size here
        color: 'white',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    information: {
        justifyContent: 'center',
        height: 250,
    },

    background: {
        position: 'absolute',
        left: -100,
        right: 0,
        top: 0,
        height: 800,
        width: 1000
    }

})
