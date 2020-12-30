import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

const Modal = styled.Modal`

`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`;

const ModalBody = styled.View`
    background-color: #83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px; 
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalItem = styled.View`
    background-color: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;

const UserName = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ServiceName = styled.Text`
    color: #000000;
    font-size: 16px;
    font-weight: bold;
`;

const ServicePrice = styled.Text`
    color: #000000;
    font-size: 16px;
    font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #268596;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const FinishButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

const DateNextArea = styled.TouchableOpacity`
    flex: 1;
    align-items: flex-start;
`;

const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

const DateTitle = styled.Text`
    color: #000000;
    font-size: 17px;
    font-weight: bold;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const TimeItemText = styled.Text`
    font-size: 16px;
`;


const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const diasDaSemana = [
    'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
];

export default ({ show, setShow, user, service }) => {

    const navigation = useNavigation();
    const [anoSelecionado, setAnoSelecionado] = useState(0);
    const [mesSelecionado, setMesSelecionado] = useState(0);
    const [diaSelecionado, setDiaSelecionado] = useState(0);
    const [horaSelecionada, setHoraSelecionada] = useState(null);
    const [diasDisponiveis, setDiasDisponiveis] = useState([]);
    const [horasDisponiveis, setHorasDisponiveis] = useState([]);

    useEffect(() => {
        let dataAtual = new Date();
        setAnoSelecionado(dataAtual.getFullYear());
        setMesSelecionado(dataAtual.getMonth());
        setDiaSelecionado(dataAtual.getDate());
    }, []);

    useEffect(() => {
        if (user.available) {
            let quantidadeDeDiasNoMes = new Date(anoSelecionado, mesSelecionado + 1, 0).getDate();
            let novaListaDeDias = [];

            for (let i = 1; i <= quantidadeDeDiasNoMes; i++) {
                
                let data = new Date(anoSelecionado, mesSelecionado, i);
                let ano = data.getFullYear();
                let mes = data.getMonth() + 1;
                let dia = data.getDate();
                mes = mes < 10 ? `0${mes}` : mes;
                dia = dia < 10 ? `0${dia}` : dia;
                let dataSelecionada = `${ano}-${mes}-${dia}`;
                let disponibilidade = user.available.filter(a => a.date === dataSelecionada);

                novaListaDeDias.push({
                    status: (disponibilidade.length > 0),
                    diaDaSemana: diasDaSemana[data.getDay()],
                    numeroDoDia: i
                });
            }
            setDiasDisponiveis(novaListaDeDias);
            setDiaSelecionado(0);
            setHoraSelecionada(0);
            setHorasDisponiveis([]);
        }
    }, [user, mesSelecionado, anoSelecionado]);

    useEffect(() => {
        if (user.available && diaSelecionado > 0) {
            let data = new Date(anoSelecionado, mesSelecionado, diaSelecionado);
            
            let ano = data.getFullYear();
            let mes = data.getMonth() + 1;
            let dia = data.getDate();
            mes = mes < 10 ? `0${mes}` : mes;
            dia = dia < 10 ? `0${dia}` : dia;
            let dataSelecionada = `${ano}-${mes}-${dia}`;
            
            let disponibilidade = user.available.filter(a => a.date === dataSelecionada);
            if (disponibilidade.length > 0) {
                setHorasDisponiveis(disponibilidade[0].hours);
            }
        }
        setHoraSelecionada(null);
    }, [user, diaSelecionado])

    const handleCloseButton = () => {
        setShow(false);
    }

    const handlePrevDateClick = () => {
        let data = new Date(anoSelecionado, mesSelecionado, 1);
        data.setMonth(data.getMonth() - 1);
        setAnoSelecionado(data.getFullYear());
        setMesSelecionado(data.getMonth());
        setDiaSelecionado(0);  
    }

    const handleNextDateClick = () => {
        let data = new Date(anoSelecionado, mesSelecionado, 1);
        data.setMonth(data.getMonth() + 1);
        setAnoSelecionado(data.getFullYear());
        setMesSelecionado(data.getMonth());
        setDiaSelecionado(0);
    }
    
    const handleFinishClick = async () => {
        if (user.id && service != null && 
            anoSelecionado > 0 && mesSelecionado > 0 && diaSelecionado > 0 && horaSelecionada != null) {
                /*let response = await Api.setAppointment(
                    user.id, service, anoSelecionado, mesSelecionado, diaSelecionado, horaSelecionada);
                if (response.error == '') {
                    setShow(false);
                    navigation.navigate('Agendamentos');
                } else {
                    alert(response.error);
                }*/
                setShow(false);
                navigation.navigate('Agendamentos');
        } else {
            alert("Preencha todos os dados.");
        }
    }

    return (
        <Modal
            transparent
            visible={show}
            animationType='slide'
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width='40' height='40' fill='#000000'/>
                    </CloseButton>
                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{ uri: user.avatar}} />
                            <UserName>{ user.name }</UserName>
                        </UserInfo>
                    </ModalItem>

                    { 
                        service != null && 
                            <ModalItem>
                                <ServiceInfo>
                                    <ServiceName>{ user.services[service].name }</ServiceName>
                                    <ServicePrice>R$ { user.services[service].price.toFixed(2) }</ServicePrice>
                                </ServiceInfo>
                            </ModalItem>
                    }

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handlePrevDateClick}>
                            <NavPrevIcon width='35' height='35' fill='#000000' />
                            </DatePrevArea>
                            <DateTitleArea>
                                <DateTitle>{ meses[mesSelecionado] } { anoSelecionado }</DateTitle>
                            </DateTitleArea>
                            <DateNextArea onPress={handleNextDateClick}>
                                <NavNextIcon width='35' height='35' fill='#000000' />
                            </DateNextArea>
                        </DateInfo>
                        <DateList horizontal showsHorizontalScrollIndicator={false}>
                            { 
                                diasDisponiveis.map((item, key) => (
                                    <DateItem 
                                        key={key}
                                        onPress={() => item.status ? setDiaSelecionado(item.numeroDoDia) : null}
                                        style={{
                                            opacity: item.status ? 1 : 0.5,
                                            backgroundColor: item.numeroDoDia === diaSelecionado ? '#4EADBE' : '#FFFFFF'
                                        }}
                                    >
                                        <DateItemWeekDay
                                            style={{
                                                color: item.numeroDoDia === diaSelecionado ? '#FFFFFF' : '#000000'
                                            }}
                                        >
                                            { item.diaDaSemana }
                                        </DateItemWeekDay>
                                        <DateItemNumber
                                            style={{
                                                color: item.numeroDoDia === diaSelecionado ? '#FFFFFF' : '#000000'
                                            }}                                        
                                        >
                                            { item.numeroDoDia }
                                        </DateItemNumber>
                                    </DateItem>
                                ))
                            }
                        </DateList>
                    </ModalItem>

                    {
                        diaSelecionado > 0 && horasDisponiveis.length > 0 &&
                        <ModalItem>
                            <TimeList horizontal showsHorizontalScrollIndicator={false}>
                            {
                                horasDisponiveis.map((item, key) => (
                                    <TimeItem 
                                        key={key}
                                        onPress={() => setHoraSelecionada(item)}
                                        style={{
                                            backgroundColor: item === horaSelecionada ? '#4EADBE' : '#FFFFFF'
                                        }}
                                    >
                                        <TimeItemText
                                            style={{
                                                color: item === horaSelecionada ? '#FFFFFF' : '#000000',
                                                fontWeight: item === horaSelecionada ? 'bold' : 'normal'
                                            }}
                                        >
                                            {item}
                                        </TimeItemText>
                                    </TimeItem>
                                ))
                            }
                            </TimeList>
                        </ModalItem>
                    }
                    
                    <FinishButton onPress={handleFinishClick}> 
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}
