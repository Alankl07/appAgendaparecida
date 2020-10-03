import React, { useEffect, useState } from 'react';
import { View, Button, Text, ImageBackground, TextInput, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Provider } from '../../server/Provider';

import styles from './styles';
import imageAparecida from '../../assets/aparecidaImage.png';

interface Param {
    route: any
}

const Login = () => {

    const [userName, setUsername] = useState('');
    const [passwor, setPassword] = useState('');
    const [load, setLoad] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();

    const logar = async () => {
        setLoad(true);
        const response = await Provider.logar({ userName: userName, password: passwor });

        try {
            console.log(response.data)
            if(userName == ''){
                setLoad(false)
                Alert.alert(
                    'Atenção!',
                    `Informe seu usuário.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                return
            }

            if(passwor == ''){
                setLoad(false)
                Alert.alert(
                    'Atenção!',
                    `Informe sua senha.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                return
            }

            if (response.data.status == 401) {
                Alert.alert(
                    'Atenção!',
                    `Usuáio ou senha incorreto.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                await AsyncStorage.setItem('userName', userName);
                await AsyncStorage.setItem('id', response.data._id);
                await AsyncStorage.setItem('nomeCompleto', response.data.nomeCompleto);
                navigation.navigate("Home");
            }
            setLoad(false);
        } catch (err) {
            setLoad(false)
            console.log(err)
            Alert.alert(
                'Erro!',
                `Erro ao tentar fazer login, por favor tente novamente.`,
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        }
    }

    const getUserName = async () => {
        const userName = await AsyncStorage.getItem('userName');
        if (userName !== null) {
            setUsername(userName)
            navigation.navigate("Home");
        }
    }

    useEffect(() => {
        getUserName();
    }, [])

    useEffect(() => {
        setUsername('');
        setPassword('');
    },[route.params])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={imageAparecida} style={styles.image} >

                <View style={styles.View} >
                    <View style={{ flex: 1, width: "100%", justifyContent: "space-around" }} >
                        <Text style={{ alignSelf: "center", fontSize: 30, fontWeight: "bold", color: "#FFF" }}>Login</Text>
                        <TextInput value={userName} onChangeText={(value: string) => { setUsername(value) }} style={{ height: 40, backgroundColor: "#FFF", paddingLeft: 10, marginBottom: 20, fontSize: 15 }} placeholder="Nome de Usuário" />
                        <TextInput passwordRules="" secureTextEntry={true} value={passwor} onChangeText={(value: string) => { setPassword(value) }} style={{ height: 40, backgroundColor: "#FFF", marginBottom: 20, fontSize: 15, paddingLeft: 10 }} placeholder="Senha" />
                        <View style={{ width: 150, alignSelf: "center" }} >
                            {load ? (
                                <View style={{ elevation: 1, backgroundColor: "#1E90FF", width: 150, height: 35 }} >
                                    <ActivityIndicator size="large" color="#FFF" />
                                </View>
                            ):(
                                <Button title="Acessar" onPress={() => { logar() }} />
                            )}
                        </View>
                        <View  >
                            <Text style={{ color: "#FFF", fontSize: 20, marginTop: 20 }} onPress={() => {
                                navigation.navigate("Cadastro")
                            }} >Casdastrar-se</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Login;