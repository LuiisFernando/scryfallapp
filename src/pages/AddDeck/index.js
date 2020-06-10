import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, TextInput, Alert, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import { store } from '../../redux';
import { insertDeck, clearDeck } from '../../redux/modules/decks/actions';

import logo from '../../assets/logo.png';
import white from '../../assets/white.png';
import black from '../../assets/black.png';
import blue from '../../assets/blue.png';
import red from '../../assets/red.png';
import green from '../../assets/green.png';

import { Container, Header, Body, List, Cor, CorView, AddButton, AddButtonText, CorImg } from './styles';

export default function AddDeck() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [deckName, setDeckname] = useState('');
    const [colors, setColors] = useState();

    const maxWidth = Dimensions.get('window').width;

    const deckToEdit = route.params?.deckID;

    useEffect(() => {
        let colorAvailable = [
            {
                id: 'black',
                image: black,
                selected: false
            },
            {
                id: 'white',
                image: white,
                selected: false
            },
            {
                id: 'blue',
                image: blue,
                selected: false
            },
            {
                id: 'red',
                image: red,
                selected: false
            },
            {
                id: 'green',
                image: green,
                selected: false
            }
        ];

        if (deckToEdit) {
            setDeckname(deckToEdit.deckName);
            colorAvailable = colorAvailable.map(color => {
                return {
                    ...color,
                    selected: color.id === deckToEdit.color
                };
            })
        }
        
        setColors(colorAvailable);

    }, []);

    function navigateBack() {
        navigation.goBack();
    }

    function selectColor(color) {
        console.log(color);
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
        debugger
        const selectedColor = colors.find(x => x.selected);

        if (deckName && selectedColor) {
            const decksInserted = store.getState().decks;

            const id = decksInserted.decks ? decksInserted.decks.length + 1 : 1;
            try {
                const deckNew = {
                    id,
                    deckName,
                    color: selectedColor.id,
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
                
            } catch (err) {
                Alert.alert('ops', 'ocorreu um erro');
                console.log(err);
            }
        }
    }

    async function handleEdit() {
        
    }

    async function limparMemoria() {
        AsyncStorage.clear();
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
            <View>
                <TextInput 
                    style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 30,
                        marginHorizontal: 20,
                        borderRadius: 25
                    }}
                    placeholder="Nome do deck"
                    value={deckName} 
                    onChangeText={setDeckname} />
                
                {colors && (
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
                )}
            </View>
            <View style={{ marginTop: 50 }}>
                <AddButton onPress={handleAdd}>
                    <AddButtonText>
                        Adicionar
                    </AddButtonText>
                </AddButton>
                <AddButton onPress={limparMemoria} style={{ marginTop: 50}}>
                    <AddButtonText>
                        limpar memoria
                    </AddButtonText>
                </AddButton>
            </View>
            
        </Body>
    </Container>
    );
}
