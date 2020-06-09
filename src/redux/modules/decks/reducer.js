import produce from 'immer';

import {
    DECK_INSERT,
    DECK_DELETE,
    DECK_EDIT,
    DECK_CLEAR
} from '../../constant/index';

const INITIAL_STATE = {
    decks: null
};

export default function decks(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case DECK_INSERT: {
                draft.decks = draft.decks || [];
                draft.decks.push(action.payload.card);
                break;
            }
            case DECK_DELETE: {
                const deck = draft.decks.find(x => x.id === payload.id);
                draft.decks.remove(deck);
                break;
            }
            case DECK_CLEAR: {
                draft.decks = [];
                break;
            }
            default:
        }
    });
}