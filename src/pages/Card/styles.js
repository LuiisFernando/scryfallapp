import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;

export const Body = styled.View`
    flex: 1;
    /* background-color: blue; */
`;

export const List = styled.FlatList`
    z-index: 1;
`;

export const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 30px;
`;

export const SearchInput = styled.TextInput`
    background-color: #FFF;
    padding: 0 30px;
    margin: 0 10px;
    border-radius: 25px;
    width: 80%;
    height: 40px;
`;

export const ListContainer = styled.View`
    flex: 1;
`;

export const CardContainer = styled.View`
    /* flex: 1; */
    align-items: center;
    justify-content: center;
    padding-top: 50px;
`;

export const CardImage = styled.Image`
    width: 400px;
    height: 580px;
`;

export const CardName = styled.Text`
    font-weight: bold;
    font-size: 20px;
`;