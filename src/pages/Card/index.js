import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Header, Body, List, CardInfo } from './styles';

export default function Card() {
    const navigation = useNavigation();
    const [cardName, setCardName] = useState('fallen');
    const [cards, setCards] = useState([]);
    const [cardInfo, setCardInfo] = useState(null);

    const bottomRef = useRef(null);
    const windowHeight = Dimensions.get('window').height;

    console.log((windowHeight / 100) * 20);

    useEffect(() => {
        if (cardInfo) {
            bottomRef.current.snapTo(1);
        }
    }, [cardInfo]);

    function navigateBack() {
        navigation.goBack();
    }

    async function findCard() {
        try {

            const response = await api.get(`cards/search?q=${cardName}`);
            console.log('passou da request');
            // const { id, artist, colors, name, image_uris, legalities } = response.data.data[0]
            
            // console.log(id, artist, colors, name, image_uris, legalities);

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
        navigation.navigate('CardDetail', { card });
        // setCardInfo(card);
        // console.log(card);
        // bottomRef.current.snapTo(1);
    }

    function closeBottomSheet() {
        bottomRef.current.snapTo(2);
        setCardInfo(null);
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
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-around'
                }}>
                    <TextInput style={{
                                backgroundColor: 'white',
                                paddingHorizontal: 30,
                                marginHorizontal: 10,
                                borderRadius: 25,
                                width: '80%'
                            }} placeholder="Card" value={cardName} onChangeText={setCardName} />
                    <TouchableOpacity onPress={findCard}>
                        <Icon name="search" size={28} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, zIndex: 0 }}>
                    {cards && (
                        <List 
                            data={cards}
                            renderItem={({ item: card }) => (
                                <TouchableWithoutFeedback onPress={() => selectCard(card)}>
                                    <View style={{ flex: 1, paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image 
                                            source={{ uri: card.image_uris.normal}} 
                                            style={{
                                                width: 388, height: 580
                                            }}
                                        />
                                        <Text>{card.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    )}
                </View>
                
                    {cardInfo && (
                        <ScrollBottomSheet
                            // style={{ display: cardInfo ? 'flex' : 'none', flex: 1 }}
                            ref={bottomRef}
                            componentType="ScrollView"
                            snapPoints={[0, 50 , windowHeight - 200]}
                            initialSnapIndex={1}
                            scrollEnabled
                            renderHandle={() => (
                                <View style={styles.header}>
                                    <>
                                        {/* <View style={styles.panelHandle} /> */}
                                        <TouchableOpacity onPress={() => closeBottomSheet()} style={{ backgroundColor: 'red', width: 100}}>
                                                <Icon name="x" size={20} color="gray" />
                                        </TouchableOpacity>
                                    </>
                                </View>
                            )}
                            // keyExtractor={i => i}
                            contentContainerStyle={styles.contentContainerStyle}
                        >
                            
                            {/* <ScrollView style={{ backgroundColor: '#FFF'}}> */}
                                <ScrollView style={{ flex: 1, backgroundColor: 'yellow'}}>
                                    <View>
                                        <Text>{cardInfo.name}</Text>
                                        <Text>{cardInfo.type}</Text>
                                        <Text>{cardInfo.oracle_text}</Text>
                                        <Text>{cardInfo.flavor_text}</Text>
                                    </View>
                                    <View>
                                        <Text>Standard: {cardInfo.legalities.standard === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Pioneer: {cardInfo.legalities.pioneer === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Modern: {cardInfo.legalities.modern === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Legacy: {cardInfo.legalities.legacy === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Vintage: {cardInfo.legalities.vintage === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Brawl: {cardInfo.legalities.brawl === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Historic: {cardInfo.legalities.historic === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Pauper: {cardInfo.legalities.pauper === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Penny: {cardInfo.legalities.penny === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                        <Text>Commander: {cardInfo.legalities.commander === 'legal' ? 'LEGAL' : 'NOT LEGAL'}</Text>
                                    </View>
                                    {cardInfo.image_uris.normal && (
                                        <Image source={{ uri: cardInfo.image_uris.normal }} style={{ width: 350, height: 500 }} />
                                    )}
                                    <Text>{cardInfo.artist}</Text>
                                </ScrollView>
                            {/* </ScrollView> */}
                            
                        </ScrollBottomSheet>
                    )}
            </Body>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    contentContainerStyle: {
        flex: 1,
      padding: 16,
      backgroundColor: '#FFF'
    //   backgroundColor: '#F3F4F9',
    },
    header: {
        flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomColor: 'black'
      
    },
    panelHandle: {
      width: 40,
      height: 2,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 4,

    }
  });