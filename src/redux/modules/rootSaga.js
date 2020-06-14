import { all } from 'redux-saga/effects';

import symbology from './symbology/saga'

export default function* rootSaga() {
    return yield all([symbology]);
}