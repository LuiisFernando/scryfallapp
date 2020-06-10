import styled from 'styled-components';

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