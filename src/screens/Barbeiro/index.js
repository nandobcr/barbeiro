import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation, useRoute } from '@react-navigation/native';
import Stars from '../../components/Stars';
import AgendamentoModal from '../../components/AgendamentoModal';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import { 
    Container,
    Scroller,
    PageBody,
    BackButton,
    LoadingIcon
} from './styles';

import {
    SwipeDot,
    SwipeActiveDot,
    SwipeItem,
    SwipeImage,
    FakeSwiper
} from './styles-swipe';

import {
    UserInfoArea,
    UserAvatarArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton
} from './styles-user';

import {
    ServicesTitle,
    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseButtonText
} from './styles-service';

import {
    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody
} from './styles-testimonials';

import Api from '../../Api';

export default () => {
    
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getInfoBarbeiro = async () => {
            setLoading(true);

            let json = await Api.getBarbeiro(userInfo.id);
            if (json.error == '') {
                setUserInfo(json.data);
                setFavorited(json.data.favorited);
            } else {
                alert(`Erro: ${json.error}`);
            }

            setLoading(false);
        }
        getInfoBarbeiro();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick = () => {
       setFavorited(!favorited); 
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    return (
        <Container>
            <Scroller>
                {   
                    userInfo.photos && userInfo.photos.length > 0
                    ? 
                        <Swiper
                            style={{ height: 240}}
                            dot={<SwipeDot />}
                            activeDot={<SwipeActiveDot />}
                            paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                            autoplay
                        >
                            { 
                                userInfo.photos.map((item, key) => (
                                    <SwipeItem key={key}>
                                        <SwipeImage source={{uri: item.url}} resizeMode='cover' />
                                    </SwipeItem>
                                ))
                            }
                        </Swiper>
                    :
                        <FakeSwiper />
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatarArea 
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.00,
                                elevation: 24
                            }}
                        >
                            <UserAvatar source={{ uri: userInfo.avatar }} />
                        </UserAvatarArea>
                        <UserInfo>
                            <UserInfoName>{ userInfo.name }</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber />
                        </UserInfo>
                        <UserFavButton 
                            onPress={handleFavClick}
                            style={{
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 12,
                                    },
                                    shadowOpacity: 0.58,
                                    shadowRadius: 16.00,
                                    elevation: 24
                                }}
                            >
                            {
                                favorited
                                ? <FavoriteFullIcon width='24' height='24' fill='#FF0000' />
                                : <FavoriteIcon width='24' height='24' fill='#999999'/>
                            }
                        </UserFavButton>
                    </UserInfoArea>
                    
                    { loading && <LoadingIcon size='large' color='#000000' /> }

                    { userInfo.services && 
                        <ServiceArea>
                            <ServicesTitle>Lista de serviços</ServicesTitle>
                            { 
                                userInfo.services.map((item, key) => (
                                    <ServiceItem key={key}>
                                        <ServiceInfo>
                                            <ServiceName>{ item.name }</ServiceName>
                                            <ServicePrice>R$ { item.price.toFixed(2) }</ServicePrice>
                                        </ServiceInfo>
                                        <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                                            <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                                        </ServiceChooseButton>
                                    </ServiceItem>
                                ))
                            }
                        </ServiceArea>
                    }
                    {
                        userInfo.testimonials && userInfo.testimonials.length > 0 &&
                            <TestimonialArea>
                                <Swiper
                                    style={{ height: 110 }}
                                    showsPagination={false}
                                    showsButtons
                                    prevButton={<NavPrevIcon width='35' height='35' fill='#000000' />}
                                    nextButton={<NavNextIcon width='35' height='35' fill='#000000' />}
                                >
                                    {
                                        userInfo.testimonials.map((item, key) => (
                                            <TestimonialItem key={key}>
                                                <TestimonialInfo>
                                                    <TestimonialName>{ item.name }</TestimonialName>
                                                    <Stars stars={item.rate} showNumber={false} />
                                                </TestimonialInfo>    
                                                <TestimonialBody>{ item.body }</TestimonialBody>
                                            </TestimonialItem>
                                        ))
                                    }
                                </Swiper>
                            </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width='44' height='44' fill='#FFFFFF' />
            </BackButton>

            <AgendamentoModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />

        </Container>
    );
}