import React, { useEffect } from 'react';
import { Image, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../assets/logo.png';

import { Container, Header } from './styles';

export default function Main() {
    const navigation = useNavigation();

    useEffect(() => {
        async function loadDecks() {
            try {
                const response = await AsyncStorage.getItem('@deckInfo');
                console.log('decks >> ', response);
            } catch (err) {
                
            }
        }

        loadDecks();
    }, []);

    function goToAddDeck() {
        navigation.navigate('Deck');
    }

    return (
        <Container>
            <Header>
                <Image source={logo} />

                <Text style={{ fontSize: 15, color: '#737380' }}>
                    Você tem 8 decks
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

            <FlatList
                style={{ marginTop: 32 }}
                data={[1, 2, 3]}
                keyExtractor={deck => String(deck)}
                renderItem={({ item }) => (
                    <View>
                        <Text>123</Text>
                    </View>
                )}
            />

            <TouchableOpacity onPress={goToAddDeck}>
                <Text>Adicionar deck</Text>
            </TouchableOpacity>
        </Container>
    );
}