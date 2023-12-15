import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fileService } from "../../../services/api/files.service";
import { addDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import {
	fileUndefined,
	titleNotAllowed,
} from "../../../services/utils/static.data";

const CreateFile = (prop) => {
	const { titleFile, setTitlefile, setHasError, setErrorMsg, setLoading } =
		prop;

	const dispatch = useDispatch();

	// state for data
	const [file, setFile] = useState("");

	const onChangeFile = (event) => {
		const fileSelected = event.target.files[0];
		if (fileSelected) {
			setFile(fileSelected);
		} else {
			setFile("");
			setHasError(true);
			setErrorMsg(fileUndefined);
		}
	};

	// function to reset inputs when user out of modal
	const onClose = () => {
		setTitlefile("");
		setFile(null);

		const fileInput = document.getElementById("fileInput");
		if (fileInput) {
			fileInput.value = "";
		}
	};

	// Function to create a file and send it to API
	const createFile = async (event) => {
		setLoading(true);
		try {
			event.preventDefault();

			if (titleFile.length > 2) {
				const titleWithoutWhitespaces = titleFile.trim();

				const formData = new FormData();
				formData.append("title", titleWithoutWhitespaces);
				formData.append("document", file);

				const { data } = await fileService.createFile(formData);

				dispatch(addDocument(data.file));
				setLoading(false);
				setTitlefile("");
				setFile("");
			} else {
				setHasError(true);
				setErrorMsg(titleNotAllowed);
				setLoading(false);
			}
		} catch (error) {
			console.log(error.stack);
			setHasError(true);
			setErrorMsg(error.response.data.message);
			setLoading(false);
		}
	};

	return (
		<div
			id="createModal"
			className="modal fade"
			tabIndex="-1"
			aria-labelledby="createModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="createModalLabel">
							New file
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={onClose}
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={createFile}>
							<label className="form-label">File Name</label>
							<input
								name="title"
								type="text"
								value={titleFile}
								className="form-control mb-3"
								placeholder="File name"
								maxLength={15}
								onChange={(event) => setTitlefile(event.target.value)}
							/>

							<label className="form-label">File</label>
							<input
								id="fileInput"
								className="form-control"
								type="file"
								name="document"
								accept="application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								onChange={onChangeFile}
							/>
							<div className="form-text mb-3">
								<p> You can only choose file of type PDF, TXT or Word </p>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-outline-secondary"
									data-bs-dismiss="modal"
									onClick={onClose}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="btn btn-outline-primary d-flex"
									data-bs-dismiss="modal"
									disabled={!titleFile || !file}
								>
									Add
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateFile;
