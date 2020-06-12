import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Container = styled.View`
    flex: 1;
    padding: 0 24px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

export const Body = styled.View`
    flex: 1;
    max-width: 411px;
`;

export const AddNewCardButton = styled.TouchableOpacity`
    margin: 30px 0;
    background-color: #000;
    padding: 15px;
`;

export const AddNewCardButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    align-self: center;
`;

export const CardContainer = styled.View`
    /* flex: 1; */
    align-items: center;
    justify-content: center;
    padding-top: 50px;
`;

export const CardImage = styled.Image`
    width: 288px;
    height: 410px;
`;

export const CardName = styled.Text`
    font-weight: bold;
    font-size: 20px;
`;