import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const PageBody = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 50px;
    margin-top: -50px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 100px
`;