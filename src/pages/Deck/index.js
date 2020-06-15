import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { useStore, useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/modules/decks/actions';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';

import {
    Container,
    Header,
    PresentationText,
    DeleteText,
    ColorDeckImage,
    Body,
    DeckInfoContainer,
    InfoContainer,
    CardListContainer,
    AddNewCardButton,
    AddNewCardButtonText,
    CardName,
    CardContainer,
    CardImage
} from './styles';

export default function Deck() {
    const route = useRoute();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const store = useStore();
    const dispatch = useDispatch();
    const [deck, setDeck] = useState(null);
    
    const deckID = route.params?.deckID;

    // const loadDeck = useCallback(async () => {
    //     const deckFromState = store.getState().decks.decks.find(x => x.id === deckID);
    //     setDeck(deckFromState);
    // }, [deckID]);

    function loadDeck() {
        const deckFromState = store.getState().decks.decks.find(x => x.id === deckID);
        setDeck(deckFromState);
    }

    useEffect(() => {
        loadDeck();
    }, [isFocused]);

    const totalCards = useMemo(() => {
        return deck ? deck.cards.length : 0
    }, [deck]);

    const images = useMemo(() => {
        return {
            red: require('../../assets/red.png'),
            green: require('../../assets/green.png'),
            white: require('../../assets/white.png'),
            black: require('../../assets/black.png'),
            blue: require('../../assets/blue.png'),
        };
    }, []);

    function navigateBack() {
        navigation.goBack();
    }

    function navigatoToAddCards() {
        navigation.navigate('Card', { deckID: deck.id });
    }

    function navigateToCardDetail(card) {
        navigation.navigate('CardDetail', { card });
    }

    function navigateToEditDeck() {
        navigation.navigate('AddDeck', { deckID: deck.id });
    }

    function deleteCardFromDeck(card) {
        const message = `Deseja deletar ${card.name} do deck ${deck.deckName}`
        Alert.alert('Deletar', message,
            [
                {
                text: 'Não',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
                },
                { text: 'Sim', onPress: () => {
                    dispatch(deleteCard(card.id, deck.id));
                    loadDeck();
                } }
            ],
        { cancelable: false }
        );
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
                {deck && (
                    <>
                        <DeckInfoContainer>
                            <ColorDeckImage source={images[deck.color]} />
                            <PresentationText numberOfLines={1}>
                                {deck.deckName}
                            </PresentationText>
                            <TouchableOpacity onPress={navigateToEditDeck} style={{ marginLeft: 50 }}>
                                <Icon name="edit-3" size={25} color="gray" />
                            </TouchableOpacity>
                        </DeckInfoContainer>
                        <InfoContainer>
                            {totalCards > 0 ? (
                                <Text>Existem {totalCards} cartas nesse deck, você pode adicionar quantas quiser ;)</Text>
                            ) : (
                                <Text>Tá esperando o que para adicionar cartas no seu deck ? ;D</Text>
                            ) }
                            <DeleteText>
                                * Para deletar uma carta, segure o dedo no deck por 5 segundos
                            </DeleteText>
                            <AddNewCardButton onPress={navigatoToAddCards}>
                                <AddNewCardButtonText>
                                    Adicionar card
                                </AddNewCardButtonText>
                            </AddNewCardButton>
                        </InfoContainer>
                        <CardListContainer>
                            {deck.cards && deck.cards.length > 0 && (
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={deck.cards}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={card => String(card.id)}
                                    renderItem={({ item: card }) => (
                                        <TouchableWithoutFeedback onPress={() => navigateToCardDetail(card)} onLongPress={() => deleteCardFromDeck(card)}>
                                            <CardContainer>
                                                <CardName>{card.name}</CardName>
                                                <CardImage source={{ uri: card.image_uris.normal}} resizeMode="contain" />
                                            </CardContainer>
                                        </TouchableWithoutFeedback>
                                    )}
                                />
                            )}
                        </CardListContainer>
                    </>
                )}
            </Body>

        </Container>
    );
}