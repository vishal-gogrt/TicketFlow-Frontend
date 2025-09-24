import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});
