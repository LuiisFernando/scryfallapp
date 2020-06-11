import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Image, Text, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useStore } from 'react-redux';
import logo from '../../assets/logo.png';

import { 
    Container,
    Header,
    CounterText,
    WelcomeText,
    PresentationText,
    List,
    Deck,
    DeckContainer,
    DeckColorImage,
    DeckColorName,
    DeckName,
    Arrow,
    AddNewDeckButton,
    AddNewDeckButtonText
} from './styles';

export default function Main() {
    const navigation = useNavigation();
    const [decks, setDecks] = useState([]);
    const isFocused = useIsFocused();
    const store = useStore();
    
    const images = {
        red: require('../../assets/red.png'),
        green: require('../../assets/green.png'),
        white: require('../../assets/white.png'),
        black: require('../../assets/black.png'),
        blue: require('../../assets/blue.png'),
    }

    const totalDecks = useMemo(() => {
        return decks ? decks.length : 0
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
        navigation.navigate('Deck', { deckID: deck.id });
    }

    return (
        <Container>
            <Header>
                <Image source={logo} />

                <CounterText>
                    Você tem {totalDecks} decks
                </CounterText>
            </Header>

            <WelcomeText>
                    Bem-vindo!
            </WelcomeText>
            <PresentationText>
                Aqui você pode montar seu deck com as cartas que você quiser
            </PresentationText>

            <AddNewDeckButton onPress={goToAddDeck}>
                <AddNewDeckButtonText>
                    Adicionar deck
                </AddNewDeckButtonText>
            </AddNewDeckButton>

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
        </Container>
    );
}