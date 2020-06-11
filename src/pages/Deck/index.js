import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { useStore } from 'react-redux';
// import { store } from '../../redux';
import Icon from 'react-native-vector-icons/Feather';
import logo from '../../assets/logo.png';

import {
    Container,
    Header,
    Body,
    AddNewCardButton,
    AddNewCardButtonText
} from './styles';

export default function Deck() {
    const route = useRoute();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const store = useStore();
    const [deck, setDeck] = useState(null);
    
    const deckID = route.params?.deckID;

    const loadDeck = useCallback(async () => {
        const deckFromState = store.getState().decks.decks.find(x => x.id === deckID);
        setDeck(deckFromState);
    }, [deckID]);

    useEffect(() => {
        loadDeck();
    }, [isFocused]);

    const totalCards = useMemo(() => {
        return deck ? deck.cards.length : 0
    }, [deck]);

    const images = {
        red: require('../../assets/red.png'),
        green: require('../../assets/green.png'),
        white: require('../../assets/white.png'),
        black: require('../../assets/black.png'),
        blue: require('../../assets/blue.png'),
    }

    function navigateBack() {
        navigation.goBack();
    }

    function navigatoToAddCards() {
        navigation.navigate('Card', { deckID: deck.id });
    }

    function navigateToCardDetail(card) {
        navigation.navigate('CardDetail', { card });
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
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Image source={images[deck.color]} style={{ width: 100, height: 100 }} />
                            <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 20 }}>{deck.deckName}</Text>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            {totalCards > 0 ? (
                                <Text>Existem {totalCards} cartas nesse deck, você pode adicionar quantas quiser ;)</Text>
                            ) : (
                                <Text>Tá esperando o que para adicionar cartas no seu deck ? ;D</Text>
                            ) }
                            <AddNewCardButton onPress={navigatoToAddCards}>
                                <AddNewCardButtonText>
                                    Adicionar card
                                </AddNewCardButtonText>
                            </AddNewCardButton>
                        </View>
                        <View style={{ flex: 1}}>
                            {deck.cards && deck.cards.length > 0 && (
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={deck.cards}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={card => String(card.id)}
                                    renderItem={({ item: card }) => (
                                        <TouchableWithoutFeedback onPress={() => navigateToCardDetail(card)}>
                                            <View style={{ flexDirection: 'column' , alignItems: 'center' }}>
                                                <Image source={{ uri: card.image_uris.normal}} resizeMode="contain" style={{ width: 288, height: 410, }} />
                                                <Text>{card.name}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                />
                            )}
                        </View>
                    </>
                )}
            </Body>

        </Container>
    );
}