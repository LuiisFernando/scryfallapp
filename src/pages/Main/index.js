import React, { useEffect, useState, useMemo } from 'react';
import { Image, Alert, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useStore, useDispatch } from 'react-redux';
import { deleteDeck, clearDeck } from '../../redux/modules/decks/actions';
import { loadSymbols } from '../../redux/modules/symbology/actions';
import logo from '../../assets/logo.png';

import { 
    Container,
    Header,
    CounterText,
    WelcomeText,
    PresentationText,
    DeleteText,
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
    const dispatch = useDispatch();
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

    function loadSymbol() {
        const symbology = store.getState().symbology;

        if (!symbology || symbology.symbols.length === 0) {
            dispatch(loadSymbols());
        }
    }

    useEffect(() => {
        loadSymbol();
    }, []);

    const totalDecks = useMemo(() => {
        return decks ? decks.length : 0
    }, [decks]);

    async function loadDeckCallback() {
        try {
            var response = store.getState().decks;
            if (response) {
                setDecks([]);
                setDecks(response.decks);
            }
        } catch (err) {
            Alert.alert('ops', 'Ocorreu um erro ao carregar os decks');
            console.log(err);
        }
    }

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

    function deleteDeckFromState(deck) {
        const message = `Deseja deletar o deck ${deck.deckName} ?`;

        Alert.alert('Deletar', message,
            [
                {
                text: 'Não',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
                },
                { text: 'Sim', onPress: () => {
                    dispatch(deleteDeck(deck.id));
                    loadDeckCallback();
                } }
            ],
        { cancelable: false }
        );
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
            <DeleteText>
                * Para deletar um deck, segure o dedo no deck por 5 segundos
            </DeleteText>

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
                    <Deck onPress={() => goToEditDeck(deck)} onLongPress={() => deleteDeckFromState(deck)}>
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