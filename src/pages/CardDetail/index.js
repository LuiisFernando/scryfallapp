import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import logo from '../../assets/logo.png';

import { insertCard } from '../../redux/modules/decks/actions';

import { 
    Container,
    Header,
    Body,
    CardInfo,
    CardName,
    CardType,
    InfoText,
    TextsWrap,
    FlavorText,
    Legalities, 
    LegalitiesColumn,
    AddNewCardButton,
    AddNewCardButtonText
} from './styles';

export default function CardDetail() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { card } = route.params;
    const deckID = route.params?.deckID;

    console.log(card);
    console.log(deckID);

    function navigateBack() {
        navigation.goBack();
    }

    function addCardOnDeck() {
        dispatch(insertCard(card, deckID));
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
                <ScrollView  style={{ flex: 1 }}>
                    <View>
                        <CardInfo>
                            <CardName>{card.name}</CardName>
                            <CardType>{card.type}</CardType>
                            <InfoText>{card.oracle_text}</InfoText>
                            {card.flavor_text && (
                                <TextsWrap>
                                    <FlavorText>{card.flavor_text}</FlavorText>
                                </TextsWrap>
                            )}
                            {card.power && (
                                <TextsWrap>
                                    <InfoText>{card.power}</InfoText>
                                </TextsWrap>
                            )}
                            <InfoText>Illustred by {card.artist}</InfoText>
                        </CardInfo>
                        <Legalities>
                            <LegalitiesColumn>
                                <Text>Standard: {card.legalities.standard === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Pioneer: {card.legalities.pioneer === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Modern: {card.legalities.modern === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Legacy: {card.legalities.legacy === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Vintage: {card.legalities.vintage === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                            </LegalitiesColumn>
                            <LegalitiesColumn>                        
                                <Text>Brawl: {card.legalities.brawl === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Historic: {card.legalities.historic === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Pauper: {card.legalities.pauper === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Penny: {card.legalities.penny === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                <Text>Commander: {card.legalities.commander === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                            </LegalitiesColumn>
                            
                        </Legalities>
                        {deckID && (
                            <AddNewCardButton onPress={addCardOnDeck}>
                                <AddNewCardButtonText>
                                    Adicionar card ao deck
                                </AddNewCardButtonText>
                            </AddNewCardButton>
                        )}
                        {card.image_uris.normal && (
                            <Image source={{ uri: card.image_uris.normal }} style={{ alignSelf: 'center', width: 388, height: 580, marginBottom: 50 }} />
                        )}
                        
                        
                        
                        
                    </View>
                </ScrollView>
            </Body>
        </Container>
    );
}