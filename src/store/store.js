import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

// import homeReducer from './homeSlice';
import api from "../services/api"; // our axios instance

// persist config for auth
const persistConfig = {
  key: "auth",
  storage,
};

// wrap only auth reducer with persist
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// subscribe to store changes → update axios headers
store.subscribe(() => {
  const state = store.getState();
  const token = state.auth?.token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
});

// Development: Add mock user for testing (remove in production)
if (process.env.NODE_ENV === 'development') {
  const state = store.getState();
  if (!state.auth.token) {
    store.dispatch({
      type: 'auth/login/fulfilled',
      payload: {
        user: {
          name: 'Dev User',
          email: 'dev@example.com',
          platformRole: 'super', // This allows access to dashboard routes
          _id: 'dev-user-123'
        },
        token: 'dev-token-123'
      }
    });
  }
}

export const persistor = persistStore(store);
export default store;
