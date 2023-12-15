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
			const { _id, title } = action.payload;

			// find the document for updated it
			const file = state.documents.find((item) => item._id === _id);

			if (file) {
				file.title = title;
			}
		},
		deleteDocument: (state, action) => {
			const { _id } = action.payload;

			// find the document for delete it
			const file = state.documents.find((item) => item._id === _id);
			if (file) {
				// removing the document from store
				const data = state.documents.filter((item) => item._id !== _id);
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
