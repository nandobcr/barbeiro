import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

import SignInput from '../../components/SignInput';
import { 
    Container, 
    CustomButton,
    CustomButtonText, 
    InputArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles'; 

import AsyncStorage from '@react-native-community/async-storage';

import Logo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleSignClick = async () => {
        if (nome != '' && email != '' && senha != '') {
            let response = await Api.signUp(nome, email, senha);
            const { token } = response;
            if (token) {
                await AsyncStorage.setItem('token', token);
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: response.data.avatar
                    }
                });
                
                //MainTab
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                })                
            }
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <Logo width="100%" height="160"/>
            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nome}
                    onChangeText={texto => setNome(texto)}
                
                />
                <SignInput 
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={texto => setEmail(texto)}
                
                />
                <SignInput 
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChangeText={texto => setSenha(texto)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}