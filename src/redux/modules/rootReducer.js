import { combineReducers } from 'redux';

import decks from './decks/reducer';
import symbology from './symbology/reducer';

export default combineReducers({
    decks,
    symbology
});