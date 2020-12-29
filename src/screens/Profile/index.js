import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { Container } from './styles';
import Api from '../../Api';

export default () => {
    
    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.logout();
        await AsyncStorage.removeItem('token');
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <Text>Profile</Text>
            <Button title='Sair' onPress={handleLogoutClick} />
        </Container>
    );
}