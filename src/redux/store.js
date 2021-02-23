import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import { USER_LOGOUT } from '../redux/userLogout/userLogoutTypes';

//Reducers:
import authReducer from './authReducer/authReducer';
import powerStatReducer from './userPowerLifts/powerLiftReducer';
import statReducer from './userStats/userStatReducer';
import programReducer from './userPrograms/userProgramReducer';
import programExerciseReducer from './userProgramExercises/programExerciseReducer';
import formattedProgramReducer from './userFormattedPrograms/formattedProgramsReducer';
import userDetailReducer from './userDetails/detailReducer';

//LocalStorage from window browser:
import storage from 'redux-persist/lib/storage';

//Persist Configuration:
export const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'auth',
        'user',
        'powerStats',
        'stats',
        'programs',
        'programExercises',
        'formattedProgram',
    ],
};

//Creating enhancers:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//RootReducer:

const appReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    powerStats: powerStatReducer,
    stats: statReducer,
    programs: programReducer,
    programExercises: programExerciseReducer,
    formattedProgram: formattedProgramReducer,
    user: userDetailReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

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
