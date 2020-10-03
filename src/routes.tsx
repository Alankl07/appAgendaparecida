import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/home';

const Stack = createStackNavigator(); 

const Routes = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator headerMode="none" >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Cadastro" component={Cadastro}/>
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;