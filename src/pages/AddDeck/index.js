import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useStore } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import { insertDeck, editDeck, clearDeck } from '../../redux/modules/decks/actions';
import { clearSymbols } from '../../redux/modules/symbology/actions';

import logo from '../../assets/logo.png';
import white from '../../assets/white.png';
import black from '../../assets/black.png';
import blue from '../../assets/blue.png';
import red from '../../assets/red.png';
import green from '../../assets/green.png';

import { 
    Container,
    Header,
    Body,
    List,
    Cor,
    CorView,
    AddButton,
    AddButtonText,
    CorImg 
} from './styles';

export default function AddDeck() {
    const navigation = useNavigation();
    const route = useRoute();
    const store = useStore();
    const dispatch = useDispatch();
    const [deckName, setDeckname] = useState('');
    const [colors, setColors] = useState();

    const deckToEdit = route.params?.deckID;
    
    const images = {
        red: require('../../assets/red.png'),
        green: require('../../assets/green.png'),
        white: require('../../assets/white.png'),
        black: require('../../assets/black.png'),
        blue: require('../../assets/blue.png'),
    }

    useEffect(() => {
        let colorAvailable = [
            {
                id: 1,
                name: 'black',
                image: black,
                selected: false
            },
            {
                id: 2,
                name: 'white',
                image: white,
                selected: false
            },
            {
                id: 3,
                name: 'blue',
                image: blue,
                selected: false
            },
            {
                id: 4,
                name: 'red',
                image: red,
                selected: false
            },
            {
                id: 5,
                name: 'green',
                image: green,
                selected: false
            }
        ];

        if (deckToEdit) {
            const deck = store.getState().decks.decks.find(x => x.id === deckToEdit);

            setDeckname(deck.deckName);
            colorAvailable = colorAvailable.map(color => {
                return {
                    ...color,
                    selected: color.id === deck.color
                };
            })
        }
        
        setColors(colorAvailable);

    }, []);

    function navigateBack() {
        navigation.goBack();
    }

    function selectColor(color) {
        const coresNova = colors.map(cor => {
            return {
                ...cor,
                selected: false
            };
        });
        const cor = coresNova.find(x => x.id === color.id);
        cor.selected = true;

        setColors(coresNova);
    }

    async function handleAdd() {
        const selectedColor = colors.find(x => x.selected);

        if (deckName && selectedColor) {
            const decksInserted = store.getState().decks;

            const id = decksInserted.decks ? decksInserted.decks.length + 1 : 1;
            try {
                const deckNew = {
                    id,
                    deckName,
                    color: selectedColor.name,
                    cards: []
                };

                dispatch(insertDeck(deckNew))

                setDeckname('');
                
                setColors(colors.map(cor => {
                    return {
                        ...cor,
                        selected: false
                    };
                }));
                navigateBack();
            } catch (err) {
                Alert.alert('ops', 'ocorreu um erro');
                console.log(err);
            }
        }
    }

    async function handleEdit() {
        if (deckName && deckToEdit) {
            dispatch(editDeck(deckToEdit, deckName));
            navigateBack();
        }
    }

    async function limparMemoria() {
        dispatch(clearSymbols());
        dispatch(clearDeck());
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
            <View style={{ flex: 1 }}>
                <View>
                    <TextInput 
                        style={{
                            backgroundColor: 'white',
                            paddingHorizontal: 30,
                            marginHorizontal: 20,
                            borderRadius: 25,
                        }}
                        placeholder="Nome do deck"
                        value={deckName} 
                        onChangeText={setDeckname} />
                </View>
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', paddingTop: 100, alignItems: 'center', justifyContent: 'center',  maxWidth: 300 }}>
                        {colors && colors.map(color => (
                            <TouchableWithoutFeedback onPress={() => selectColor(color)} key={color.id}>
                                <CorView selecionado={color.selected}>
                                    <Image source={color.image} style={{ width: 100, height: 100 }} />
                                </CorView>
                            </TouchableWithoutFeedback>
                        ))}
                        {/* <TouchableWithoutFeedback>
                            <CorView>
                                <Image source={images.red} style={{ width: 100, height: 100 }} />
                            </CorView>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <CorView selecionado={true}>
                                <Image source={images.green} style={{ width: 100, height: 100 }} />
                            </CorView>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <CorView>
                                <Image source={images.blue} style={{ width: 100, height: 100 }} />
                            </CorView>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <CorView>
                                <Image source={images.white} style={{ width: 100, height: 100 }} />
                            </CorView>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <CorView>
                                <Image source={images.black} style={{ width: 100, height: 100 }} />
                            </CorView>
                        </TouchableWithoutFeedback> */}
                    </View>
                </View>

                {!deckToEdit ? (
                    <AddButton onPress={handleAdd}>
                        <AddButtonText>
                            Adicionar
                        </AddButtonText>
                    </AddButton>
                ) : (
                    <AddButton onPress={handleEdit}>
                        <AddButtonText>
                            Editar
                        </AddButtonText>
                    </AddButton>
                )}

                {/* {colors && (
                    <List
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={colors}
                        keyExtractor={img => String(img.id)}
                        renderItem={({ item: color }) => (
                            <Cor onPress={() => selectColor(color)}>
                                <CorView selecionado={color.selected}>
                                    <CorImg source={color.image} />
                                </CorView>
                            </Cor>
                        )}
                    />
                )} */}
            </View>

            
        </Body>
    </Container>
    );
}
