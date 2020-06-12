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


export function deleteCard(cardID, deckID) {
    return {
        type: CARD_DELETE,
        payload: { cardID, deckID }
    };
}

export function deleteDeck(deckID) {
    return {
        type: DECK_DELETE,
        payload: { deckID }
    };
}

export function editDeck(id, name) {
    return {
        type: DECK_EDIT,
        payload: { id, name }
    };
}


export function clearDeck() {
    return {
        type: DECK_CLEAR
    }
}