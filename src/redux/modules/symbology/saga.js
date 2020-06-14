import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { loadSymbolsSuccess } from './actions';

import {
    LOAD_SYMBOLS
} from '../../constant/index';

export function* loadSymbolsFromAPI() {
    try {
        
        const response = yield call(api.get, 'symbology');
        if (response && response.data && response.data.data.length > 0 ){
            const objeto = response.data.data.map(symb => {
                return {
                    symbol: symb.symbol,
                    image: symb.svg_uri
                };
            });
            yield put(loadSymbolsSuccess(objeto));
        }

    } catch (error) {
        console.log('error on loadSymbolsFromAPI ', error);
    }
    
}

export default all([
    takeLatest(LOAD_SYMBOLS, loadSymbolsFromAPI)
]);