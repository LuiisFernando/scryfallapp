import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { store, persistor } from './redux';
import Routes from './routes';

export default function Index() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    );
}