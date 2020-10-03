import React, { useState } from 'react';
import { View, Button, Text, TextInput, ImageBackground, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign as Icon } from '@expo/vector-icons';

import styles from './styles';
import imageAparecida from '../../assets/aparecidaImage.png';
import { Provider } from '../../server/Provider';

const Cadastro = () => {

    const [nomeCompleto, setNomeCompleto] = useState('');
    const [userName, setUserName] = useState('');
    const [load, setLoad] = useState(false);

    const navigation = useNavigation();

    async function cadastra() {
        setLoad(true)
        const data = { nomeCompleto: nomeCompleto, userName: userName }

        const response = await Provider.cadastrar(data)

        try {
            if(nomeCompleto.length < 15){
                setLoad(false)
                Alert.alert(
                    'Atenção!',
                    `É necessário que informe o seu nome completo.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                return
            }

            if(userName == ''){
                setLoad(false)
                Alert.alert(
                    'Atenção!',
                    `É necessário que informe o seu nome de usuário.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                return
            }

            if (response.data.message) {
                Alert.alert(
                    'Atenção!',
                    `${response.data.message}`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Cadastro realizado com sucesso!',
                    `Essa é sua senha de acesso ${response.data.password} `,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                navigation.navigate("Login");
            }
            setLoad(false)
        } catch (err) {
            setLoad(false)
            console.log(err)
            Alert.alert(
                'Atenção!',
                `Houve um erro no seu cadastro, por favor tente novamente.`,
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={imageAparecida} style={styles.image}>
                <Icon style={{ position: "absolute", alignSelf: "flex-start", top: 0, marginLeft: 10 }} onPress={() => { navigation.goBack() }} name="arrowleft" size={35} color="black" />
                <View style={styles.views}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, alignSelf: "center", color: "#FFF", marginTop: 20 }}>Tela de Cadastro</Text>

                    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 10 }}>
                        <TextInput value={nomeCompleto} onChangeText={(value) => { setNomeCompleto(value) }} style={{ backgroundColor: "#FFF", width: "100%", height: 40 }} placeholder="Digite seu nome completo" />
                        <TextInput value={userName} onChangeText={(value) => { setUserName(value) }} style={{ backgroundColor: "#FFF", width: "100%", height: 40 }} placeholder="Digite nome de Usuário" />
                        {load ? (
                            <View style={{ elevation: 1, backgroundColor: "#1E90FF", width: 150, height: 35 }} >
                                <ActivityIndicator size="large" color="#FFF" />
                            </View>
                            ):(
                                <View style={{ width: 150 }}>
                                    <Button title="Cadastrar" onPress={() => { cadastra() }} />
                                </View>

                            )
                        }
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Cadastro;