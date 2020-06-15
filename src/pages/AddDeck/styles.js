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

export const ColorContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ColorContent = styled.View`
    flex: 1;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 100px;
    align-items: center;
    justify-content: center;
    max-width: 300px;
`;

export const ColorView = styled.View`
    flex-direction: row;
    background-color: ${props => (props.selecionado ? 'gray' : 'transparent') };
`;

export const ColorImg = styled.Image`
    width: 100px;
    height: 100px;
`;

export const AddButton = styled.TouchableOpacity`
    background-color: #222;
    justify-content: center;
    align-items: center;
    height: 44px;
    align-self: stretch;
    margin: 50px 10px;
`;

export const AddButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const Input = styled.TextInput`
    background-color: white;
    padding: 0 30px;
    margin: 0 20px;
    border-radius: 25px;
    height: 45px;
`;