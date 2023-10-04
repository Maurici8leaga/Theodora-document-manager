import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UtilsService } from "../../../services/utils/utils.service";
import { fileService } from "../../../services/api/files.service";
import { addDocument } from "../../../redux-toolkit/reducers/files/files.reducer";

const CreateFile = (prop) => {
	const { titleFile, setTitlefile, arrayFiles } = prop;

	const dispatch = useDispatch();

	const [file, setFile] = useState("");
	const [document, setDocument] = useState("");

	const onChangeFile = (event) => {
		const fileSelected = event.target.files[0];
		if (fileSelected) {
			setDocument(fileSelected.type);
			setFile(event.target.value);
		}
	};

	const createFile = async (event) => {
		try {
			event.preventDefault();

			// function to calculate the maximum number of identifiers in the db
			const maxId = UtilsService.maxId(arrayFiles);

			// function to filter the document types and returns the static document defined for each one
			const { documentPath, fileType } =
				UtilsService.setDocumentByType(document);

			const { data } = await fileService.createFile({
				id: maxId + 1,
				title: titleFile,
				document: documentPath,
				fileType,
			});

			dispatch(addDocument(data));

			setTitlefile("");
			setDocument("");
			setFile("");
		} catch (error) {
			console.log(error.stack);
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
								onChange={(event) => setTitlefile(event.target.value)}
								required
							/>

							<label className="form-label">File</label>
							<input
								className="form-control"
								type="file"
								name="document"
								accept="application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								onChange={onChangeFile}
								required
							/>
							<div className="form-text mb-3">
								<p> You can only choose file of type PDF, TXT or Word </p>
							</div>

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
									className="btn btn-outline-primary d-flex"
									data-bs-dismiss={`${
										titleFile !== "" && file !== "" ? "modal" : null
									}`}
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
