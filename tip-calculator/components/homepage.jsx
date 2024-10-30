import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
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

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
   

  ];

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>

      <LinearGradient
        colors={['rgba(183,72,102,0.8)', 'transparent']}
        style={styles.background}
      />

      <View style={styles.welcome}>
        <View>
          <Text style={styles.header}>
            Welcome, {name}!
          </Text>
        </View>
      </View>

      <View style={styles.displayContainer}>

        <View style={styles.display}>
          <View style={styles.totalTipsBox}>
            <Text style={styles.subheader}>
              Total Money
            </Text>
          </View>

          <View style={styles.totalTipsBoxNumber}>
            <Text style={styles.headerTips}>
              ${userData.totalTips}
            </Text>
          </View>
        </View>

        <View style={styles.listOfDaysContainer}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  /**
   * Container of Entire Screen
   */

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  /**
   * Display Box with Total Money inside 
   */

  display: {
    borderWidth: 1.5,
    borderColor: "black",
    width: 340,
    height: 200,
    justifyContent: 'left',
    alignItems: 'center',
    padding: 8,
    marginTop: 30,
    backgroundColor: '#EEE5E9',
    borderRadius: 15,
    justifyContent: 'space-evenly',

  },

  /**
   * Background Styling (Linear Gradient)
   */

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },

  /**
   * View div that holds the display container
   */

  displayContainer: {
    height: 700,
    width: 350,
    alignItems: 'center',
    justifyContent: 'top',
  },

  /**
   * View div that holds the welcome message
   */

  welcome: {
    justifyContent: 'center',
    //alignItems: 'center',
    width: 'auto',
    height: 'auto',
    paddingVertical: 10,
    top: 30
  },

  /**
   * View div that holds the text "total money"
   */

  totalTipsBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: 300,
    height: 'auto',
    paddingVertical: 10,
    padding: 10,
  },

  /**
   * View div that holds the number of total money
   */

  totalTipsBoxNumber: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: 300,
    height: 'auto',
    paddingVertical: 10,
    padding: 10,
  },

  listOfDaysContainer: {
    top: 20,
    width: 350,
    height: 400,
  },

  item: {
    backgroundColor: '#EEE5E9',
    marginVertical: 5,
    padding: 30,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
   

  },

  /**
   * Text Styles
   */

  header: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
    color: '#EEE5E9'

  },

  subheader: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: 'black'
  },

  headerTips: {
    fontSize: 50,
    fontFamily: "Poppins_600SemiBold",
    color: 'black'

  },


})
