import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/Splash';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stack/MainTab';
import Barbeiro from '../screens/Barbeiro';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
            headerShown: false
        }}    
    >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Barbeiro" component={Barbeiro} />
    </Stack.Navigator>

);