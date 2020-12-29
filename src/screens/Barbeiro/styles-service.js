import styled from 'styled-components/native';

export const ServiceArea = styled.View`
    margin-top: 30px;
`;

export const ServicesTitle = styled.Text`
    color: #268596;
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
    margin-bottom: 20px;
`;

export const ServiceItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServiceName = styled.Text`
    color: #268596;
    font-size: 16px;
    font-weight: bold; 
`;

export const ServicePrice = styled.Text`
    color: #268596;
    font-size: 14px;
`;

export const ServiceChooseButton = styled.TouchableOpacity`
    background-color: #4EADBE;
    border-radius: 10px;
    padding: 10px 15px;
`;

export const ServiceChooseButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 14px;
    font-weight: bold;
`;