import React from 'react';
import styled from 'styled-components/native';
import Stars from '../components/Stars';

const Area = styled.View`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;    
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

const VerPerfil = styled.View`
    width: 85px;
    height: 20px;
    border: 1px solid #4EADBE;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

const VerPerfilButtonText = styled.Text`
    font-size: 13px;
    color: #268596;
`;

export default ({item}) => {
    return (
        <Area>
            <Avatar source={{uri: item.avatar }} />
            <InfoArea>
                <UserName>{item.name}</UserName>
                <Stars stars={item.stars} showNumber={true} />               
                <VerPerfil>
                    <VerPerfilButtonText>Ver perfil</VerPerfilButtonText>
                </VerPerfil>
            </InfoArea>        
        </Area>
    );
}