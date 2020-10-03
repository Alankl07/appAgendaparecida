import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Provider } from '../../server/Provider';
import imageAparecida from '../../assets/aparecidaImage.png';
import { AntDesign as Icon } from '@expo/vector-icons';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';

interface Noites {
    _id: string,
    noite: string,
    data: string,
    horario: string,
    tema: string,
    homenagiados: string,
    vagas: number,
}

interface arrayNoite {
    idNoite: string,
    idUser: string,

}

const Home = () => {

    const [noites, setNoites] = useState<Noites[]>([]);
    const [IdUser, setIdUser] = useState('');
    const [idNoite, setIdNoite] = useState<arrayNoite[]>([]);
    const [agendado, setagendado] = useState(false);
    const [load, setLoad] = useState(true);

    const navigation = useNavigation();

    function getNoites() {
        Provider.getNoites().then(response => {
            if(response.data){
                setLoad(false)
                setNoites(response.data)
            }
        })
    }

    function agendar(id: string, dataNoite: string) {
        if (IdUser) {
            var data = { idUser: IdUser, idNoite: id, dataNoite: dataNoite }
        } else {
            getIdUser();
            Alert.alert(
                'Atenção!',
                `Falha no agendamento, por favor tente novamente.`,
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
            return
        }

        Provider.agendar(data).then(response => {
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
                return
            }

            if (response.status == 201) {
                getNoites();
                Alert.alert(
                    'Sucesso!',
                    `Agendamento feito com sucesso.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
            }

            if (response.data.idUser) {
                getAgendamento(response.data.idUser)
            }

        }).catch((err) => {
            console.log(err),
                Alert.alert(
                    'Erro!',
                    `Houve um erro ou tentarmos confirmar seu agendamento, por favor tente novamente.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
        })
    }

    function cancelar(idUser: string, idNoite: string) {
        console.log(idNoite);
        const ids = {idUser: idUser, idNoite: idNoite}
        Provider.cancelarAgendamento(ids).then(response => {
            if(response.data.message){
                Alert.alert(
                    'Sucesso!',
                    `Agendamento cancelado.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
                setagendado(false);
                getNoites();
                getAgendamento(idUser);
            }else{
                Alert.alert(
                    'Erro!',
                    `Erro ao tentar cancelar agendamento, tente novamente.`,
                    [
                        {
                            text: 'Ok',
                        },
                    ],
                    { cancelable: false }
                );
            }
            // console.log(response.data.message);
        }).catch((err) => {
            console.log(err)
            Alert.alert(
                'Erro!',
                `Erro ao tentar cancelar seu agendamento, por favor tente novamente.`,
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: false }
            );
        })
    }

    function sair() {
        AsyncStorage.removeItem('userName');
        navigation.navigate("Login", { 'atualizar': '' })
    }

    function getAgendamento(idUser: string) {

        if (idUser) {
            Provider.getAgendamento(idUser).then(response => {
                
                console.log(response.data.length == 0)
                if (response.data.length == undefined) {
                    return
                }


                setIdNoite(response.data);
                setagendado(true);
            })
        } else {
            getIdUser();
        }
    }

    function confirmarAgendamento(noite: any) {
        console.log(noite);
        Alert.alert(
            `Confirme seu agendamento.`,
            `${noite.noite} \n\n Data: ${noite.data}`
            ,
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        agendar(noite._id, noite.data);
                    }
                }
            ],
            { cancelable: false }
        );
    }

    function cancelarAgendamento(idUser: string, noite: any) {
        Alert.alert(
            `Deseja realmente cancelar o agendamento?`,
            `${noite.noite} \n\n Data: ${noite.data}`
            ,
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => {
                        cancelar(idUser, noite._id);
                    }
                }
            ],
            { cancelable: false }
        );
    }

    async function getIdUser() {
        const idUser = await AsyncStorage.getItem('id');

        if (idUser !== null) {
            setIdUser(idUser);
            getAgendamento(idUser);
        }
    }

    useEffect(() => {
        getIdUser();
    }, [])

    useEffect(() => {
        getNoites();
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={imageAparecida} style={styles.image} >
                <View style={{ flexDirection: "row", alignSelf: "flex-end" }} >
                    <View onTouchEnd={() => { sair() }} style={{ backgroundColor: "#123", width: 60, height: 25, alignItems: "center", justifyContent: "center" }} >
                        <Text style={{ fontSize: 18, color: "#FFF" }} >Sair</Text>
                    </View>
                </View>
                <View><Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginBottom: 10 }} >Tela de Agendamento</Text></View>
                {load ? (
                    <View style={{flex: 1, justifyContent: "center"}} >
                        <ActivityIndicator style={{ alignSelf: "center"}} size="large" color="blue" />
                    </View>
                        
                ) : (
                        <FlatList
                            data={noites}
                            keyExtractor={(noite) => String(noite._id)}
                            showsVerticalScrollIndicator={false}
                            style={{ marginBottom: 10 }}
                            onEndReached={getNoites}
                            renderItem={({ item: noite, index }) => (
                                <View style={styles.views} onTouchEnd={() => {
                                    if (agendado && idNoite.find(value => value.idNoite == noite._id) ) {
                                        cancelarAgendamento(IdUser, noite)
                                    } else {
                                        confirmarAgendamento(noite)
                                    }
                                }} >
                                    
                                    {console.log(idNoite.map(value => ({id: value.idNoite})).find(element => element.id == noite._id)?.id)}
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.titleText} >{noite.noite}</Text>
                                    </View>
                                    <View style={{ flex: 4, flexDirection: "row" }} >
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.texts} ><Text style={styles.titleText}>Tema:</Text> {noite.tema} </Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.texts} ><Text style={styles.titleText} >Data:</Text> {noite.data} </Text>
                                            <Text style={styles.texts} ><Text style={styles.titleText}>Horário:</Text> {noite.horario} </Text>
                                            <Text style={styles.texts} ><Text style={styles.titleText} >Vagas:</Text> {noite.vagas}</Text>
                                            {agendado && idNoite.find(value => value.idNoite == noite._id) && (
                                                <Text style={styles.texts} ><Text style={styles.titleText} >Status:</Text> Agendado</Text>
                                            )}
                                        </View>
                                    </View>
                                    {noite.homenagiados != '' && (
                                        <View>
                                            <Text style={styles.texts} ><Text style={styles.titleText} >Homenagiados:</Text> {noite.homenagiados} </Text>
                                        </View>
                                    )}
                                </View>
                            )}

                        />
                    )}
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Home;