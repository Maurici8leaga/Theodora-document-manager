import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./reducers/files/files.reducer";

export const store = configureStore({
	reducer: {
		files: fileReducer,
	},
});
