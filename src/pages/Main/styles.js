import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    flex: 1;
    background: white;
    padding: 0 24px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

export const List = styled.FlatList`
    margin-top: 20px;
`;

export const Deck = styled.TouchableWithoutFeedback``;

export const DeckContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    height: 80px;
    border: 1px solid black;
    border-radius: 10px;
`;

export const DeckColorName = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
`;

export const DeckColorImage = styled.Image`
    width: 75px;
    height: 75px;
`;

export const DeckName = styled.Text`
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
`;

export const Arrow = styled(Icon)`
    padding-right: 40px;
`;

export const AddNewDeckButton = styled.TouchableOpacity`
    margin-top: 30px;
    background-color: #000;
    padding: 15px;
`;

export const AddNewDeckButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    align-self: center;
`;