//Start project cmd : npx expo start

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Button, ScrollView, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import MenuItems from './menu'

export default function App() {
    useFonts({
        'barlow_semi_bold': require('./assets/fonts/barlow_semi_bold.ttf'),
        'bison_bold': require('./assets/fonts/bison_bold.ttf'),
        'barlow_medium': require('./assets/fonts/barlow_medium.ttf'),
    });

    //const apiUrl = "http://192.168.0.25:12345/articles"           //Maison
    //const apiUrl = "http://10.10.1.51:12345/articles"               //Crosscall
    const apiUrl = "http://172.20.10.2:12345/"

    const [textInputToken, onChangeTextInputToken] = React.useState("")

    const handleInputChange = (text) => {
        onChangeTextInputToken(text);
    };

    const [drugsList, setDrugsList] = useState([
        {"id":1,"inMyPossession":false,"name":"En attente de connexion...","requiredForOrder":true,"scanContent":"indéfini"},
    ]);

    const handleApiRequest = async (tokenTest) => {
        try {
            const response = await axios.get(apiUrl + tokenTest + "/articles");
            setDrugsList(response.data.map(item => ({
                id: item.id,
                inMyPossession: item.inMyPossession,
                name: item.name,
                requiredForOrder: item.requiredForOrder,
                scanContent: item.scanContent
            })));
            console.log('Réponse de l\'API:', response.data);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleApiRequest(textInputToken);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [textInputToken]);

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>X-SCAN</Text>
            <Text style={styles.textTitle}>ROADSHOW LOG</Text>
            <View style={styles.backgroundRectangle}>
                <Text style={styles.subTextTitle}>COMMANDE N°01082002</Text>
                <ScrollView style={styles.backgroundRectangleScrollView} contentContainerStyle={{alignItems: 'center'}}>
                    {drugsList.map((drug, index) => (
                        drug.requiredForOrder ? (
                            <View key={index} style={styles.backgroundTextRectangle}>
                                <View style={styles.textBoxContainer}>
                                    <Text style={styles.textArticle}>{drug.name}</Text>
                                    {drug.inMyPossession ? (
                                        <Text style={styles.subTextArticle}>Scan : {drug.scanContent}</Text>
                                    ) : null}
                                </View>
                                <View style={styles.iconContainer}>
                                <Icon name={drug.inMyPossession ? "checkmark-circle-outline" : "warning-outline"} size={35} color={drug.inMyPossession ? "#C3E914" : "#FF2727" } />
                                </View>
                            </View>
                        ) : null
                    ))}
                </ScrollView>
            </View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 5, color:'white', textAlign: 'center', marginTop:3 }}
                onChangeText={handleInputChange}
                value={textInputToken}
                placeholder="Token connexion mobile"
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: 40,
        lineHeight: 21,
        fontFamily: 'bison_bold',
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginTop: 20,
    },
    subTextTitle: {
        fontSize: 30,
        lineHeight: 21,
        fontFamily: 'bison_bold',
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
        marginTop: 20,
        marginBottom: 10
    },
    backgroundRectangle: {
        height: '82%',
        width: '50%',
        backgroundColor: 'white',
        marginTop: 30,
        alignItems: 'center'
    },
    backgroundRectangleScrollView: {
        height: 700,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 10,
    },
    backgroundTextRectangle: {
        height: 80,
        width: 800,
        backgroundColor: 'lightgray',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textArticle: {
        fontSize: 25,
        lineHeight: 21,
        fontFamily: 'barlow_semi_bold',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'left',
    },
    subTextArticle: {
        fontSize: 18,
        lineHeight: 21,
        fontFamily: 'barlow_medium',
        letterSpacing: 0.25,
        color: 'black',
        textAlign: 'left',
        marginTop: 5,
    },
    textBoxContainer: {
        backgroundColor: 'Yellow',
        width: 730,
    },
    iconContainer: {
        alignItems: 'end',
    },
});
