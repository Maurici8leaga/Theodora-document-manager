import { configureStore } from "@reduxjs/toolkit";

// este viene siendo como el index de los reducers, donde se declaran los reducers existentes
export const store = configureStore({
	// es necesario como minimo colocar "reducer: {}" porque si no Provider no va a renderizar los components
	reducer: {},
});