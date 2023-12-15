import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fileService } from "../../../services/api/files.service";
import { deleteDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { folderImg } from "../../../services/utils/static.data";

const DeleteFile = (prop) => {
	const { idFile, arrayDocuments, setHasError, setErrorMsg, setLoading } = prop;

	const dispatch = useDispatch();

	// state for fata
	const [title, setTitle] = useState("");
	const [typeFile, setTypeFile] = useState("");

	// function for delete a file and update the API and the store
	const deleteFile = async (idFile) => {
		setLoading(true);
		try {
			await fileService.deleteFile(idFile);

			dispatch(deleteDocument({ _id: idFile }));
			setLoading(false);
			setTitle("");
			setTypeFile("");
		} catch (error) {
			console.log(error.stack);
			setLoading(false);
			setHasError(true);
			setErrorMsg(error.response.data.message);
		}
	};

	useEffect(() => {
		// instance for get the title and type file of the document that will be deleted
		if (idFile !== undefined && arrayDocuments) {
			const fileSelected = arrayDocuments.find((item) => item._id === idFile);
			if (fileSelected) {
				setTitle(fileSelected.title);
				setTypeFile(fileSelected.fileType);
			}
		}
	}, [idFile, arrayDocuments]);

	return (
		<>
			<div
				className="modal fade"
				id="deleteModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Are you sure you want to delete this file?
							</h1>
						</div>
						<div className="modal-body">
							<div
								className="row align-items-center"
								style={{ width: "400px", margin: "auto" }}
							>
								<figure className="col align-items-center text-center">
									<img
										src={folderImg}
										className="img-thumbnail"
										alt="folder icon"
										style={{ width: "110px" }}
									/>
								</figure>
								<div className="col text-center">
									<div className="">{title}</div>
									<div>{typeFile}</div>
								</div>
							</div>
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
								type="button"
								className="btn btn-outline-danger"
								data-bs-dismiss={`${
									title !== "" && typeFile !== "" ? "modal" : null
								}`}
								onClick={() => deleteFile(idFile)}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteFile;
