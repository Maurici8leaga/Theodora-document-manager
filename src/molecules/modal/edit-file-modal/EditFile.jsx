import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { fileService } from "../../../services/api/files.service";

const EditFile = (prop) => {
	const { idFile, arrayDocuments } = prop;
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState("");
	const [documentUpdate, setDocumentUpdate] = useState("");
	const [error, setError] = useState("");

	const updateFile = async (event) => {
		try {
			event.preventDefault();

			if (newTitle.length > 0) {
				const response = await fileService.updateFile({
					id: documentUpdate.id,
					title: newTitle,
					document: documentUpdate.document,
				});

				dispatch(
					// aqui se usa el action de update para actualizar el document
					updateDocument(response.data)
				);
				setError(null);
			} else {
				setError("Title can not be empty");
			}
		} catch (error) {
			console.log(error.stack);
		}
	};

	const handleClose = () => {
		setNewTitle(newTitle);
		setError(null);
	};

	useEffect(() => {
		if (idFile !== undefined && arrayDocuments) {
			const fileSelected = arrayDocuments.find((item) => item.id === idFile);
			if (fileSelected) {
				setNewTitle(fileSelected.title);
				setDocumentUpdate(fileSelected);
			}
		}
	}, [idFile, arrayDocuments]);

	return (
		<div
			className="modal fade"
			id="editModal"
			tabIndex="-1"
			aria-labelledby="editModalLabel"
			aria-hidden="true"
			onClick={handleClose}
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="editModalLabel">
							Edit file name
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handleClose}
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={updateFile}>
							<label className="form-label">File Name</label>

							<input
								name="title-edit"
								type="text"
								value={newTitle}
								className="form-control mb-4"
								placeholder="Title"
								onChange={(event) => setNewTitle(event.target.value)}
							/>

							{error ? (
								<label className="form-label text-danger">{error}</label>
							) : (
								<></>
							)}

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-outline-secondary"
									data-bs-dismiss="modal"
									onClick={handleClose}
								>
									Close
								</button>
								<button
									type="submit"
									className="btn btn-outline-primary"
									data-bs-dismiss={`${newTitle.length > 0 ? "modal" : null}`}
								>
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
