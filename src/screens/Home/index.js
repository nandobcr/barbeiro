import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import BarbeiroItem from '../../components/BarbeiroItem';
import { request, PERMISSIONS } from 'react-native-permissions';
import GeoLocation from '@react-native-community/geolocation';

import { 
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    ListArea,
    LoadingIcon
} from './styles';

import Api from '../../Api';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
    const [locationText, setLocationText] = useState('');
    const [loading, setLoading] = useState(false);
    const [barberios, setBarbeiros] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [coords, setCoords] = useState(null);

    useEffect(() => {
        getBarbeiros();
    }, []);

    const handleLocationFinder = async () => {
        setCoords(null);
        //pedir permissão
        let resultado = await request(
            Platform.OS == 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if (resultado == 'granted') {
            setLoading(true);
            setLocationText('');
            setBarbeiros([]);

            GeoLocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getBarbeiros();
            });
        }
    }  

    const getBarbeiros = async () => {
        setLoading(true);
        setBarbeiros([]);

        let latitude = null;
        let longitude = null;

        if (coords) {
            latitude = coords.latitude;
            longitude = coords.longitude;
        }

        let response = await Api.getBarbeiros(latitude, longitude, locationText);
        if (response.error == '') {
            if (response.loc) {
                setLocationText(response.loc);
            }
            setBarbeiros(response.data);      
        } else {
            alert(`Erro: ${response.error}`);
        }
        setLoading(false);      
    }

    const onRefresh = () => {
        getBarbeiros();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbeiros();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle>Encontre seu barbeiro favorito</HeaderTitle>
                    <SearchButton>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"></SearchIcon>
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={text => setLocationText(text)}
                        onEndEditing={handleLocationSearch}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>

                {
                    loading && <LoadingIcon size="large" color="#FFFFFF" />
                }


                <ListArea>
                    {
                        barberios.map((item, key) => (
                            <BarbeiroItem key={key} item={item} />
                        ))
                    }
                </ListArea>
            </Scroller>
        </Container>
    );
}