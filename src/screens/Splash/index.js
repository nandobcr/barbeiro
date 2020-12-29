import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';
import Logo from '../../assets/barber.svg';


export default () =>  {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation(); 

    useEffect(() => {
        
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            
            if (token) {
                //validar token
                let response = await Api.checkToken(token);
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token);
                    //salvar no context do usuario
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: response.data.avatar
                        }
                    });
                    
                    //navegar para uma MainTab
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });
                } else {
                    navigation.navigate('SignIn');    
                }
            } else {
                //login
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, [])
    
    
    return (
        <Container>
            <Logo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}