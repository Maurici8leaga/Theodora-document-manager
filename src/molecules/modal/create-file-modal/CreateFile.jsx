import React, { useState } from "react";

const CreateFile = (prop) => {
	const { titleFile, setTitlefile, setDocument, postFile } = prop;

	const [file, setFile] = useState("");

	const hadleFile = (event) => {
		const fileSelected = event.target.files[0];
		if (fileSelected) {
			// escogemops solo el type porque con el vamos a simular un archivo
			setDocument(fileSelected.type);
			setFile(event.target.value);
		}
	};

	const createFile = (event) => {
		event.preventDefault();
		postFile();
		setTitlefile("");
		setDocument("");
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
								// este atributo accept permite definir cuale tipos de archivos puede seleccionar el usuario
								// estos tipos de formatos se llaman MIME  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
								accept="application/pdf, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
								onChange={hadleFile}
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
