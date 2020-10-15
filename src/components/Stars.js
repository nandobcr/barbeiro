import React from 'react';
import styled from 'styled-components/native';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View``;

const StarText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-left: 5px;
    color: #737373;
`;

//0 vazia, 1 metade, 2 cheia
export default ({ stars, showNumber }) => {
    let estrelas = [0, 0, 0, 0, 0];

    //somente os inteiros 4.7
    let inteiros = Math.floor(stars);
    let resto = stars - inteiros; 

    for(var i = 0; i < inteiros; i++) {
        estrelas[i] = 2;
    }

    if (resto > 0) {
        estrelas[i] = 1;
    }

    return (
        <StarArea>
            {
                estrelas.map((item, key) => (
                    <StarView key={key}>
                        { item == 0 && <StarEmpty width="18" height="18" fill="#FF9200"/> }
                        { item == 1 && <StarHalf width="18" height="18" fill="#FF9200"/> }
                        { item == 2 && <StarFull width="18" height="18" fill="#FF9200"/> }
                    </StarView>
                ))
            }
            { showNumber && <StarText>{stars}</StarText> }
        </StarArea>

    );
}
