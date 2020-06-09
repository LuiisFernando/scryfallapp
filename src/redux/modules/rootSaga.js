import { all } from 'redux-saga/effects';

import decks from './decks/saga';

export default function* rootSaga() {
    return yield all([decks]);
}