import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { insertCard, deleteCard, editCard } from './actions';

import {
    DECK_INSERT,
    DECK_DELETE,
    DECK_EDIT
} from '../../constant/index';

export function* insertCardSaga({ payload }) {
    console.log('DO SAGA >>>> ', payload);
}

export function setCards({ payload }) {
    console.log('CARDS INSERIDOS ', payload);
}

export default all([
    takeLatest('persist/REHYDRATE', setCards),
    takeLatest(DECK_INSERT, insertCardSaga)
]);