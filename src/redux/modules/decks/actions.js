import {
    DECK_INSERT,
    DECK_DELETE,
    DECK_EDIT,
    DECK_CLEAR,
    CARD_INSERT,
    CARD_DELETE
} from '../../constant/index';

export function insertCard(card, deckID) {
    return {
        type: CARD_INSERT,
        payload: { card, deckID }
    };
}

export function insertDeck(deck) {
    return {
        type: DECK_INSERT,
        payload: { deck }
    };
}


export function deleteCard(id) {
    return {
        type: CARD_DELETE,
        payload: { id }
    };
}

export function deleteDeck(id) {
    return {
        type: DECK_DELETE,
        payload: { id }
    };
}

export function editDeck(name, color) {
    return {
        type: DECK_EDIT,
        payload: { name, color }
    };
}


export function clearDeck() {
    return {
        type: DECK_CLEAR
    }
}