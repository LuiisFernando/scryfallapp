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
    ColorView,
    AddButton,
    AddButtonText,
    ColorContainer,
    ColorContent,
    ColorImg,
    Input
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
                        <Input
                            placeholder="Nome do deck"
                            value={deckName} 
                            onChangeText={setDeckname} />
                    </View>
                    
                    {!deckToEdit && (
                        <ColorContainer>
                            <ColorContent>
                                {colors && colors.map(color => (
                                    <TouchableWithoutFeedback onPress={() => selectColor(color)} key={color.id}>
                                        <ColorView selecionado={color.selected}>
                                            <ColorImg source={color.image} />
                                        </ColorView>
                                    </TouchableWithoutFeedback>
                                ))}
                            </ColorContent>
                        </ColorContainer>
                    )}

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

                </View>

                
            </Body>
    </Container>
    );
}
