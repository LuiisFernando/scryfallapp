import produce from 'immer';

import {
    DECK_INSERT,
    DECK_DELETE,
    DECK_EDIT,
    DECK_CLEAR,
    CARD_INSERT,
    CARD_DELETE
} from '../../constant/index';

const INITIAL_STATE = {
    decks: null
};

export default function decks(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case DECK_INSERT: {
                draft.decks = draft.decks || [];
                draft.decks.push(action.payload.deck);
                break;
            }
            case DECK_DELETE: {
                const decksWithDeletation = draft.decks.filter(x => x.id !== action.payload.deckID);
                draft.decks = decksWithDeletation;
                break;
            }
            case DECK_CLEAR: {
                draft.decks = [];
                break;
            }
            case DECK_EDIT: {
                const deckToEdit = draft.decks.find(x => x.id === action.payload.id);
                const deckToEditIndex = draft.decks.findIndex(x => x.id === action.payload.id);

                deckToEdit.deckName = action.payload.name;

                draft.decks[deckToEditIndex] = deckToEdit;

                console.log('deck editado', draft.decks[deckToEditIndex], action.payload.id);
                break;
            }
            case CARD_INSERT: {
                const deckToAddCard = draft.decks.find(x => x.id === action.payload.deckID);
                // deckToAddCard.cards.push(action.payload.card);
                const cards = deckToAddCard.cards;
                const teste = [{...action.payload.card}, ...cards];
                deckToAddCard.cards = teste;
                break;
            }
            case CARD_DELETE: {
                
                const deckToDeleteCard = draft.decks.find(x => x.id === action.payload.deckID);
                const deckToDeleteCardIndex = draft.decks.findIndex(x => x.id === action.payload.deckID);
                
                deckToDeleteCard.cards = deckToDeleteCard.cards.filter(x => x.id !== action.payload.cardID);
                draft.decks[deckToDeleteCardIndex] = deckToDeleteCard;
                break;
            }
            default:
        }
    });
}