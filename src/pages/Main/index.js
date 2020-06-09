import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Image, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { store } from '../../redux';
import logo from '../../assets/logo.png';

import { 
    Container,
    Header,
    List,
    Deck,
    DeckContainer,
    DeckColorImage,
    DeckColorName,
    DeckName,
    Arrow
} from './styles';

export default function Main() {
    const navigation = useNavigation();
    const [decks, setDecks] = useState([]);
    const isFocused = useIsFocused();

    const images = {
        red: require('../../assets/red.png'),
        green: require('../../assets/green.png'),
        white: require('../../assets/white.png'),
        black: require('../../assets/black.png'),
        blue: require('../../assets/blue.png'),
    }

    const totalDecks = useMemo(() => {
        return decks.length
    }, [decks]);

    const loadDeckCallback = useCallback(async () => {
        try {
            var response = store.getState().decks;
            if (response) {
                setDecks([]);
                setDecks(response.decks);
                console.log('decks > ', response.decks);
            }
        } catch (err) {
            Alert.alert('ops', 'Ocorreu um erro ao carregar os decks');
            console.log(err);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            loadDeckCallback();
        }
    }, [isFocused]);

    function goToAddDeck() {
        navigation.navigate('AddDeck');
    }
    
    function goToEditDeck(deck) {
        navigation.navigate('Deck', { deck });
    }

    function goToAddCard() {
        navigation.navigate('Card');
    }

    return (
        <Container>
            <Header>
                <Image source={logo} />

                <Text style={{ fontSize: 15, color: '#737380' }}>
                    Você tem {totalDecks} decks
                </Text>
            </Header>

            <Text style={{ 
                    fontSize: 30,
                    marginBottom: 16,
                    marginTop: 48,
                    color: '#13131A',
                    fontWeight: 'bold'
                }}>
                    Bem-vindo!
            </Text>
            <Text style={{
                fontSize: 16,
                lineHeight: 24,
                color: '#737380'
            }}>
                Aqui você pode montar seu deck com as cartas que você quiser
            </Text>

            <List
                data={decks}
                keyExtractor={deck => String(deck.id)}
                showsVerticalScrollIndicator={false}
                onRefresh={() => {}}
                refreshing={false}
                renderItem={({ item: deck }) => (
                    <Deck onPress={() => goToEditDeck(deck)}>
                        <DeckContainer>
                            <DeckColorName>
                                <DeckColorImage source={images[deck.color]} />
                                <DeckName>{deck.deckName}</DeckName>
                            </DeckColorName>
                            <Arrow name="arrow-right" size={20} />
                        </DeckContainer>
                    </Deck>
                )}
            />

            <TouchableOpacity onPress={goToAddDeck}>
                <Text>Adicionar deck</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToAddCard}>
                <Text>Adicionar card</Text>
            </TouchableOpacity>
        </Container>
    );
}