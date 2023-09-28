import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./reducers/files/files.reducer";

// este viene siendo como el index de los reducers, donde se declaran los reducers existentes
export const store = configureStore({
	// es necesario como minimo colocar "reducer: {}" porque si no Provider no va a renderizar los components
	reducer: {
		// el nombre debe ser el mismo que se puso en el reducer
		files: fileReducer,
	},
});
