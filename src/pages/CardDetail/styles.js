import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    justify-content: space-between;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;

export const Body = styled.View`
    flex: 1;
`;

export const CardInfo = styled.View`
    flex: 1;
    padding: 0 10px;
`;

export const CardName = styled.Text`
    font-size: 25px;
    align-self: center;
    font-weight: bold;
`;

export const CardType = styled.Text`
    font-size: 18px;
    margin-top: 20px;
`;

export const InfoText = styled.Text`
    margin-top: 20px;
    font-size: 15px;
`;

export const FlavorText = styled.Text`
    margin-top: 20px;
    font-size: 15px;
    font-style: italic;
    color: gray;
`;

export const TextsWrap = styled.View``;

export const Legalities = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
`;

export const LegalitiesColumn = styled.View`
    flex-direction: column;
`;

export const AddNewCardButton = styled.TouchableOpacity`
    margin: 10px 10px;
    margin-bottom: 30px;
    background-color: #000;
    padding: 15px;
`;

export const AddNewCardButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    align-self: center;
`;
