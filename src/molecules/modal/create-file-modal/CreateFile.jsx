import React, { useState } from "react";
import { useDispatch } from "react-redux";
// static data
import { fileService } from "../../../services/api/files.service";
import { addDocument } from "../../../redux-toolkit/reducers/files/files.reducer";

const CreateFile = (prop) => {
	const { titleFile, setTitlefile } = prop;

	const dispatch = useDispatch();

	const [file, setFile] = useState("");

	const onChangeFile = (event) => {
		const fileSelected = event.target.files[0];
		if (fileSelected) {
			// se envia el file completo
			setFile(fileSelected);
		}
	};

	const createFile = async (event) => {
		try {
			event.preventDefault();

			// El formData es un objeto que permite adjunta en el info del req.body y el req.file
			// en este caso el titlo del file y el mismo file
			const formData = new FormData();
			// se usa "append" para adjuntarlo a el
			formData.append("title", titleFile);
			formData.append("document", file);

			// request al action para crear el file
			const { data } = await fileService.createFile(formData);

			dispatch(
				// aqui se usa el actions para crear un nuevo file
				addDocument(data.file)
				// se usa data.file ya que en file es que se encuentra el objeto final a procesar
			);

			setTitlefile("");
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
								// este atributo accept permite definir cuale tipos de archivos puede seleccionar el usuario
								// estos tipos de formatos se llaman MIME  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
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
