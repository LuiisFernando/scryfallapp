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

export const List = styled.FlatList`
    margin-top: 50px;
    max-height: 200px;
`;

export const Cor = styled.TouchableWithoutFeedback`
    margin-right: 15px;
`;

export const CorView = styled.View`
    flex-direction: row;
    background-color: ${props => (props.selecionado ? 'gray' : 'transparent') };
`;

export const CorImg = styled.Image`
    width: 150px;
    height: 150px;
`;

export const AddButton = styled.TouchableOpacity`
    background-color: #222;
    justify-content: center;
    align-items: center;
    height: 44px;
    align-self: stretch;
    margin: 0 10px;
`;

export const AddButtonText = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;
