import produce from 'immer';

import { LOAD_SYMBOLS_SUCESS, CLEAR_SYMBOLS } from '../../constant/index';

const INITIAL_STATE = {
    symbols: []
};

export default function symbology(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch(action.type) {
            case LOAD_SYMBOLS_SUCESS: {
                console.log('PAYLOAD  >>> ', action.payload.symbols);
                console.log('type  >>> ', action.type);
                draft.symbols = action.payload.symbols;
                break;
            }
            case CLEAR_SYMBOLS: {
                draft.symbols = [];
                break;
            }
            default:
        }
    });
}