import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./redux/authReducer";
import { dataReducer } from "./redux/dataReducer";

export const rootReducer = combineReducers({
    authReducer,
    data: dataReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    // Add more configuration options if needed
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);