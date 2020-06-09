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

export const CardInfo = styled.View`
    display: ${props => (props.show ? 'flex' : 'none')};
    flex: 1;
    z-index: 2;
    position: absolute;
`;