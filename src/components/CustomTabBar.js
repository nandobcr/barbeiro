import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import BuscaIcon from '../assets/search.svg';
import AgendamentoIcon from '../assets/today.svg';
import FavoritoIcon from '../assets/favorite.svg';
import ProfileIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #4EADBE;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4EADBE;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({state, navigation}) => {
    
    const { state: user } = useContext(UserContext);
    
    const navegar = (nomeDaTela) => {
        navigation.navigate(nomeDaTela);
    };

    return (
        <TabArea>
            <TabItem onPress={() => navegar('Home')} >
                <HomeIcon style={{ opacity: state.index == 0 ? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={() => navegar('Busca')} >
                <BuscaIcon style={{ opacity: state.index == 1 ? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItemCenter onPress={() => navegar('Agendamentos')} >
                <AgendamentoIcon width="32" height="32" fill="#4EADBE"/>
            </TabItemCenter>
            <TabItem onPress={() => navegar('Favoritos')} >
                <FavoritoIcon style={{ opacity: state.index == 3 ? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItem onPress={() => navegar('Profile')} >
                
                {
                    user.avatar
                    ? <AvatarIcon source={{uri: user.avatar}}/>
                    : <ProfileIcon style={{ opacity: state.index == 4 ? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF"/>
                }
            </TabItem>
        </TabArea>
    );
}