import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	documents: [],
};

const fileSlice = createSlice({
	name: "files",
	initialState,
	reducers: {
		getDocument: (state, action) => {
			return { ...state, documents: action.payload };
		},
		addDocument: (state, action) => {
			state.documents.push(action.payload);
		},
		updateDocument: (state, action) => {
			const { id, title, document } = action.payload;
			const file = state.documents.find((item) => item.id === id);
			if (file) {
				file.title = title;
				file.document = document;
			}
		},
		deleteDocument: (state, action) => {
			const { id } = action.payload;
			const file = state.documents.find((item) => item.id === id);
			if (file) {
				const data = state.documents.filter((item) => item.id !== id);
				return { ...state, documents: data };
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
} = fileSlice.actions;
export default fileSlice.reducer;
