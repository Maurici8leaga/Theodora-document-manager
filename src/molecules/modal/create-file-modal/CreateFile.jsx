import React from "react";

const CreateFile = (prop) => {
	const { titleFile, setTitlefile, document, setDocument, createFile } = prop;
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
							Create a file
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
							<div className="form-floating">
								<input
									name="title"
									type="text"
									value={titleFile}
									className="form-control"
									placeholder="file name"
									onChange={(event) => setTitlefile(event.target.value)}
									required
								/>
								<label>File name</label>
							</div>
							<div className="mb-3">
								<input
									className="form-control"
									type="file"
									name="document"
									id="file"
									value={document}
									onChange={(event) => setDocument(event.target.value)}
									required
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Cancel
								</button>
								<button type="submit" className="btn btn-primary d-flex">
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
