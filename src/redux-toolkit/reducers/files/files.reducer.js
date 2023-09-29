import { createSlice } from "@reduxjs/toolkit";
// createSlice permite definir las acciones y reducers disponibles para interacturar con los datos del estado inicial de un reducer particular
import { fakeFiles } from "../../../services/utils/static.data";

// con REDUX-TOOLKIT los actions van ahora aqui adentro de los Slices
// estos actions se repetiran por los modelos que tengas user, carrito etc. En este caso es referente  al user

// const initialState = {};

const fileSlice = createSlice({
	name: "files", //este nombre es el que sera colocado en el reducer del store
	initialState: fakeFiles,
	reducers: {
		// aqui iran los actions que tendra el reducer
		addDocument: (state, action) => {
			state.push(action.payload);
			// de esta forma metemos el nuevo file dentro del archivo de files
		},
		updateDocument: (state, action) => {
			const { id, title, document } = action.payload;
			const file = state.find((item) => item.id === id);
			if (file) {
				file.title = title;
				file.document = document;
			}
		},
		deleteDocument: (state, action) => {
			const { id } = action.payload;
			const file = state.find((item) => item.id === id);
			if (file) {
				return state.filter((item) => item.id !== id);
			}
		},
	},
});

export const { addDocument, updateDocument, deleteDocument } =
	fileSlice.actions; // se debe exportar los actions
export default fileSlice.reducer;
