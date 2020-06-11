import React, { useState } from 'react';
import { TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { 
    Container,
    Header,
    Body,
    List,
    SearchContainer,
    SearchInput,
    ListContainer,
    CardContainer,
    CardImage,
    CardName
} from './styles';

export default function Card() {
    const navigation = useNavigation();
    const route = useRoute();
    const [cardName, setCardName] = useState('');
    const [cards, setCards] = useState([]);

    const deckID = route.params?.deckID;

    function navigateBack() {
        navigation.goBack();
    }

    async function findCard() {
        try {

            const response = await api.get(`cards/search?q=${cardName}`);
            if (response.data && response.data.data.length > 0) {
                setCards(response.data.data.map(card => {

                    let power = undefined;

                    if (card.power && card.toughness) {
                        power = `${card.power}/${card.toughness}`;
                    }

                    return {
                        id: card.id,
                        artist: card.artist,
                        type: card.type_line,
                        name: card.name,
                        oracle_text: card.oracle_text,
                        flavor_text: card.flavor_text,
                        power,
                        image_uris: card.image_uris ? card.image_uris : 'semimage',
                        legalities: card.legalities
                    }
                }));
            }

        } catch (err) {
            console.log('erro >>> ', err);
        }
    }

    function selectCard(card) {
        navigation.navigate('CardDetail', { card, deckID });
    }

    return (
        <Container>
            <Header>
                <Image source={logo} />

                <TouchableOpacity onPress={navigateBack}>
                    <Icon name="arrow-left" size={28} color="gray" />
                </TouchableOpacity>
            </Header>
            <Body>
                <SearchContainer>
                    <SearchInput placeholder="Card" value={cardName} onChangeText={setCardName} />
                    <TouchableOpacity onPress={findCard}>
                        <Icon name="search" size={28} color="gray" />
                    </TouchableOpacity>
                </SearchContainer>
                <ListContainer>
                    {cards && (
                        <List 
                            data={cards}
                            renderItem={({ item: card }) => (
                                <TouchableWithoutFeedback onPress={() => selectCard(card)}>
                                    <CardContainer>
                                        <CardName>{card.name}</CardName>
                                        <CardImage 
                                            source={{ uri: card.image_uris.normal}} 
                                        />
                                    </CardContainer>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    )}
                </ListContainer>
            </Body>
        </Container>
    );
}