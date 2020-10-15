import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Agendamentos from '../screens/Agendamentos';
import Favoritos from '../screens/Favoritos';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Busca" component={Busca} />
        <Tab.Screen name="Agendamentos" component={Agendamentos} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
)