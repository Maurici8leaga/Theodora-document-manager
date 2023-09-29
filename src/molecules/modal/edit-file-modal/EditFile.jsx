import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";

const EditFile = (prop) => {
	const { idFile, setTitlefile } = prop;

	const files = useSelector((state) => state.files);

	const [newTitle, setNewTitle] = useState("");
	const [documentUpdate, setDocumentUpdate] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (idFile !== undefined) {
			const fileSelected = files.find((item) => item.id === idFile);
			if (fileSelected) {
				setNewTitle(fileSelected.title);
				setDocumentUpdate(fileSelected);
			}
		}
	}, [idFile, files]);

	const updateFile = (event) => {
		event.preventDefault();
		dispatch(
			// aqui se usa el action de update para actualizar el document
			updateDocument({
				id: documentUpdate.id,
				title: newTitle,
				document: documentUpdate.document,
			})
		);
	};

	return (
		<div
			className="modal fade"
			id="editModal"
			tabIndex="-1"
			aria-labelledby="editModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="editModalLabel">
							Edit Document
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={updateFile}>
							<div className="input-group mb-3">
								<input
									name="title-edit"
									type="text"
									value={newTitle}
									className="form-control"
									placeholder="Title"
									onChange={(event) => setNewTitle(event.target.value)}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button type="submit" className="btn btn-primary">
									Save changes
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditFile;
