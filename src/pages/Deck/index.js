import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import {
    Container
} from './styles';

export default function Deck() {
    const route = useRoute();

    const deck = route.params?.deck;

    const images = {
        red: require('../../assets/red.png'),
        green: require('../../assets/green.png'),
        white: require('../../assets/white.png'),
        black: require('../../assets/black.png'),
        blue: require('../../assets/blue.png'),
    }

    return (
        <Container>
            <Image source={images[deck.color]} style={{ width: 100, height: 100 }} />
            <Text>{deck.deckName}</Text>
        </Container>
    );
}