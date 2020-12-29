import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';
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

import Api from '../../Api';

import Logo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';


export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes:[{name: 'SignUp'}]
        });
    }

    const handleSignClick = async () => {
        if (email != '' && senha != '') {
            let response = await Api.signIn(email, senha);
            if (response.token) {
                //salvar async storage o token
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
                alert('Usuário ou senha inválidos.');
            }
        } else {
            alert('Preencha os campos para login.');
        }
    }

    return (
        <Container>
            <Logo width="100%" height="160"/>
            <InputArea>
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
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}