import { createSlice } from "@reduxjs/toolkit";
// createSlice permite definir las acciones y reducers disponibles para interacturar con los datos del estado inicial de un reducer particular

// con REDUX-TOOLKIT los actions van ahora aqui adentro de los Slices
// estos actions se repetiran por los modelos que tengas user, carrito etc. En este caso es referente  al user

const initialState = {
	documents: [],
};

const fileSlice = createSlice({
	name: "files", //este nombre es el que sera colocado en el reducer del store
	initialState,
	reducers: {
		// aqui iran los actions que tendra el reducer
		getDocument: (state, action) => {
			return { ...state, documents: action.payload };
		},
		addDocument: (state, action) => {
			state.documents.push(action.payload);
			// de esta forma metemos el nuevo file dentro del archivo de files
		},
		updateDocument: (state, action) => {
			const { id, title, document } = action.payload;
			const file = state.documents.find((item) => item.id === id); // se debe buscar para poder actualizarlo
			if (file) {
				// de esta forma sobre escribimos el valor del titulo actualizado y el documento existente
				file.title = title;
				file.document = document;
			}
		},
		deleteDocument: (state, action) => {
			const { id } = action.payload;
			const file = state.documents.find((item) => item.id === id); // se debe buscar para poder eliminarlo
			if (file) {
				const data = state.documents.filter((item) => item.id !== id); //con filter quitamos del array el id seleccionado y devolvemos el resto
				// se debe almacenar en una constante antes de retornar ya que es unn objeto proxy, si se retorna directamente da error
				return { ...state, documents: data };
				// de esta forma actualizamos el state con los files restantess
			}
		},
	},
});

export const {
	getDocument,
	getDocumentById,
	addDocument,
	updateDocument,
	deleteDocument,
} = fileSlice.actions; // se debe exportar los actions
export default fileSlice.reducer;
