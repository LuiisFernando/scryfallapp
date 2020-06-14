import React from 'react';
import { YellowBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './redux';
import Routes from './routes';

YellowBox.ignoreWarnings(['Warning: ...'])

console.disableYellowBox = true;

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    );
}