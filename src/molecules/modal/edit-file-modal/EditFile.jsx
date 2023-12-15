import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { fileService } from "../../../services/api/files.service";
import { titleNotAllowed } from "../../../services/utils/static.data";

const EditFile = (prop) => {
	const { idFile, arrayDocuments, setHasError, setErrorMsg, setLoading } = prop;

	const dispatch = useDispatch();

	// state for new title
	const [newTitle, setNewTitle] = useState("");

	// function for update the title to new one and send it to API
	const updateFile = async (event) => {
		setLoading(true);
		try {
			event.preventDefault();

			// verification before update the title
			if (newTitle.length > 2) {
				// delete whitespaces of title
				const verifyTitle = newTitle.trim();

				const res = await fileService.updateFile(idFile, {
					title: verifyTitle,
				});

				dispatch(updateDocument(res.data.file));
				setLoading(false);
			} else {
				setLoading(false);
				setHasError(true);
				setErrorMsg(titleNotAllowed);
			}
		} catch (error) {
			console.log(error.stack);
			setLoading(false);
			setHasError(true);
			setErrorMsg(error.response.data.message);
		}
	};

	useEffect(() => {
		// instance for get the title of the document before it is changed
		if (idFile !== undefined && arrayDocuments) {
			const fileSelected = arrayDocuments.find((item) => item._id === idFile);
			if (fileSelected) {
				setNewTitle(fileSelected.title);
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
								placeholder="New title"
								maxLength={15}
								onChange={(event) => setNewTitle(event.target.value)}
							/>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-outline-secondary"
									data-bs-dismiss="modal"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="btn btn-outline-primary"
									data-bs-dismiss="modal"
									disabled={!newTitle}
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
