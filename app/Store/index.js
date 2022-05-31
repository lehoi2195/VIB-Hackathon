import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducer } from 'saga-slice';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import _ from 'lodash';

// Bring in all of your saga slices together in whatever file
// you're going to declare your redux store
import {
  LoadingReducer,
  GeneralModalReducer,
  LoginReducer,
  ForgotPasswordReducer,
  CreateNewAccountReducer,
  PaymentModalReducer,
  VoiceModalReducer,
  PaymentReducer,
  HomeReducer,
  PopupModalReducer,
  MyAccountReducer,
  TransactionsReducer,
} from '@/ReduxSaga';

// And add all of your saga slices into an array
const modules = [
  LoadingReducer,
  GeneralModalReducer,
  LoginReducer,
  ForgotPasswordReducer,
  CreateNewAccountReducer,
  PaymentModalReducer,
  VoiceModalReducer,
  PaymentReducer,
  HomeReducer,
  PopupModalReducer,
  MyAccountReducer,
  TransactionsReducer,
];

const sagaMiddleware = createSagaMiddleware();

// Use the `rootReducer` helper function to create a
// main reducer out of the array of saga-slice modules.
// You can optionally pass other reducers to this root
// reducer for cases where you have something outside the
// scope of saga-slice
const appReducer = rootReducer(modules);

// Typicaly redux middleware
const middleware = applyMiddleware(
  ...[
    sagaMiddleware,
    logger,
    /* redux dev tools, etc*/
  ],
);

const persistConfig = {
  key: '@VIB_HACKATHON',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const createPersistedSagaStore = () => {
  // Typicaly redux middleware

  // const store = createStore(appReducer, middleware);

  const store = createStore(persistedReducer, middleware);

  const persistor = persistStore(store);

  // Use the `rootSaga` helper function to create a generator function
  // which will instantiate all sagas using the `*all()` effect based
  // on the saga-slice modules array
  sagaMiddleware.run(rootSaga(modules));

  return { store, persistor };
};

const MainStore = createPersistedSagaStore();

export default MainStore;
