import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useStore } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { SvgCssUri } from 'react-native-svg';
import reactStringReplace from 'react-string-replace';
import logo from '../../assets/logo.png';

import { insertCard } from '../../redux/modules/decks/actions';

import { 
    Container,
    Header,
    Body,
    Scroll,
    ScrollWrap,
    CardInfo,
    CardName,
    CardType,
    InfoText,
    TextsWrap,
    FlavorText,
    Legalities, 
    LegalitiesColumn,
    LegalitiesText,
    AddNewCardButton,
    AddNewCardButtonText
} from './styles';

export default function CardDetail() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const store = useStore();
    const [card, setCard] = useState();

    // const { card } = route.params;
    const deckID = route.params?.deckID;

    function loadCard() {
        const { card } = route.params;
        setCard(card);
    }

    useEffect(() => { 
        loadCard();    
    }, []);

    function navigateBack() {
        navigation.goBack();
    }

    function addCardOnDeck() {
        dispatch(insertCard(card, deckID));
        navigateBack();
    }


    function getOracleText(oracle_text) {

        const symbology = store.getState().symbology.symbols;
        console.log('oracle text >>> ', oracle_text);

        const listaSimbolos = new Array();

        symbology.map(symbol => {
            
            var teste = oracle_text.indexOf(symbol.symbol);
            if (teste > -1) {
                listaSimbolos.push(symbol);
            }

        });
    
        let textoFormatado = oracle_text;

        let testeString = null;
        listaSimbolos.map((symb, index) => {
            let teste = index === 0 ? "20" : "100";

            testeString = reactStringReplace(textoFormatado, symb.symbol, (match, i) => (
                <SvgCssUri style={{ marginLeft: 20 }} key={index} uri={symb.image} width="20" height="20" />
            ));

            textoFormatado = testeString;
        });


        // let arrayHtml = new Array(testeString.length);

        // if (testeString && testeString.length > 0) {

        //     for (let i = 0; i < testeString.length; i++) {
        //         if (Object.prototype.toString.call(testeString[i]) === '[object Object]') {
        //             arrayHtml[i] = testeString[i];
        //         } else {
        //             arrayHtml[i] = <Text>{testeString[i]}</Text>
        //         }
                
        //     }
        //     console.log(arrayHtml);
        // }

        return <InfoText>{textoFormatado}</InfoText>;
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
                <Scroll>
                    {card && (
                        <ScrollWrap>
                            <CardInfo>
                                <CardName>{card.name}</CardName>
                                <CardType>{card.type}</CardType>
                                {/* <InfoText>{card.oracle_text}</InfoText> */}
                                {getOracleText(card.oracle_text)}
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
                                    <LegalitiesText>Standard: {card.legalities.standard === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Pioneer: {card.legalities.pioneer === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Modern: {card.legalities.modern === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Legacy: {card.legalities.legacy === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Vintage: {card.legalities.vintage === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                </LegalitiesColumn>
                                <LegalitiesColumn>                        
                                    <LegalitiesText>Brawl: {card.legalities.brawl === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Historic: {card.legalities.historic === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Pauper: {card.legalities.pauper === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Penny: {card.legalities.penny === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
                                    <LegalitiesText>Commander: {card.legalities.commander === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</LegalitiesText>
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
                        </ScrollWrap>
                    )}
                </Scroll>
            </Body>
        </Container>
    );
}