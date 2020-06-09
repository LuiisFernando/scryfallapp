import {
    DECK_INSERT,
    DECK_DELETE,
    DECK_EDIT,
    DECK_CLEAR
} from '../../constant/index';

export function insertCard(card) {
    return {
        type: DECK_INSERT,
        payload: { card }
    };
}

export function deleteCard(id) {
    return {
        type: DECK_DELETE,
        payload: { id }
    };
}

export function editCard(name, color) {
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