import React, { useState } from 'react';
import { Image, TouchableOpacity, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../../assets/logo.png';
import white from '../../assets/white.png';
import black from '../../assets/black.png';
import blue from '../../assets/blue.png';
import red from '../../assets/red.png';
import green from '../../assets/green.png';

import { Container, Header, Body, List, Cor, CorView, AddButton, AddButtonText, CorImg } from './styles';

export default function Deck() {
    const navigation = useNavigation();
    const [nomeDeck, setNomeDeck] = useState('');
    const [corSelected, setCorSelected] = useState(null);
    const [cores, setCores] = useState([
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
    ]);

    function navigateBack() {
        navigation.goBack();
    }

    function selectColor(color) {
        console.log('color selecionado ', color);
        cores.map(cor => { cor.selected = false; });
        const cor = cores.find(x => x.id === color.id);
        cor.selected = true;
        setCorSelected(color);
    }

    function handleAdd() {
        console.log(nomeDeck);
        console.log(corSelected);

        if (nomeDeck && corSelected) {
            const deckInfo = {
                nomeDeck,
                cor: corSelected.id
            };
            console.log(deckInfo)
    
            try {
                const jsonValue = JSON.stringify(deckInfo);
                AsyncStorage.setItem('@deckInfo', jsonValue);
            } catch (err) {
    
            }
        }
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
                    <TextInput style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 30,
                        marginHorizontal: 20,
                        borderRadius: 25
                    }} placeholder="Nome do deck" onChangeText={setNomeDeck} />
                    
                    <List
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={cores}
                        keyExtractor={img => String(img.id)}
                        renderItem={({ item }) => (
                            <Cor onPress={() => selectColor(item)}>
                                <CorView selecionado={item.selected}>
                                    <CorImg source={item.image} />
                                </CorView>
                            </Cor>
                        )}
                    />
                </View>
                <View style={{ marginTop: 50 }}>
                    <AddButton onPress={handleAdd}>
                        <AddButtonText>
                            Adicionar
                        </AddButtonText>
                    </AddButton>
                </View>
                
            </Body>
        </Container>
    );
}
