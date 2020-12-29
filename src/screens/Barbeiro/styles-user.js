import styled from 'styled-components/native';

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const UserAvatarArea = styled.View`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
`;

export const UserAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
`;

export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
`;