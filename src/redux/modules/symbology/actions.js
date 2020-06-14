import { LOAD_SYMBOLS, LOAD_SYMBOLS_SUCESS, CLEAR_SYMBOLS } from '../../constant/index';


export function loadSymbols() {
    return {
        type: LOAD_SYMBOLS,
    };
}

export function loadSymbolsSuccess(symbols) {
    return {
        type: LOAD_SYMBOLS_SUCESS,
        payload: { symbols }
    };
}

export function clearSymbols() {
    return {
        type: CLEAR_SYMBOLS
    }
}