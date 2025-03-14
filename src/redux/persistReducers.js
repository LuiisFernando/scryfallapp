// import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'scryfallapp',
      storage: AsyncStorage,
      whitelist: ['decks', 'symbology'],
    },
    reducers,
  );

  return persistedReducer;
};
