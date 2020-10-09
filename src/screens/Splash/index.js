import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles'; 
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/barber.svg';

export default () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const token = null;
            if (token) {
                //validar token
                //AsyncStorage
            } else {
                setTimeout(function() {
                    navigation.navigate('SignIn')
                }, 2000)
            }
        }

        checkToken();
    }, [])
    
    
    return (
        <Container>
            <Logo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
    );
}