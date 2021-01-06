import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';

//Reducers:

//LocalStorage from window browser:
import storage from 'redux-persist/lib/storage';

//Persist Configuration:
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

//Creating enhancers:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//RootReducer:

const appReducer = combineReducers({
    form: formReducer,
});

//Persisting RootReducer:
const persistRootReducer = persistReducer(persistConfig, rootReducer);

//Creating store with reducers and redux extension
const store = createStore(
    persistRootReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

//Persisted Version of store:
const persistor = persistStore(store);

export { store, persistor };
