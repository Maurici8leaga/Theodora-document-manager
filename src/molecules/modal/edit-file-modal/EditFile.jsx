import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { fileService } from "../../../services/api/files.service";

const EditFile = (prop) => {
	const { idFile, arrayDocuments, setHasError, setErrorMsg } = prop;
	const dispatch = useDispatch();

	// state for new title
	const [newTitle, setNewTitle] = useState("");

	const updateFile = async (event) => {
		try {
			event.preventDefault();

			// debe ir este condicional para cuando el length es menor que 2 ya que asi se crea otra barrera de seguridad aparte la del backend
			if (newTitle.length > 2) {
				// quitamos los espacios en blanco del inicio y final del titulo asi no puede enviar algo con puros espacios en blanco
				const verifyTitle = newTitle.trim();

				// se envia el id del file y solo el title actualizado
				const res = await fileService.updateFile(idFile, {
					title: verifyTitle,
				});

				dispatch(
					// aqui se usa el action de update para actualizar el document
					updateDocument(res.data.file)
				);
			} else {
				setHasError(true);
				// de esta forma podemos mostrar el mensaje que viene del back
				setErrorMsg("Error, title should have at least 2 characters");
			}
		} catch (error) {
			console.log(error.stack);
			setHasError(true);
			// de esta forma podemos mostrar el mensaje que viene del back
			setErrorMsg(error.response.data.message);
		}
	};

	useEffect(() => {
		if (idFile !== undefined && arrayDocuments) {
			const fileSelected = arrayDocuments.find((item) => item._id === idFile);
			if (fileSelected) {
				// al cargar cada modal para editar este buscara y establecera el titulo viejo del documento
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
								value={newTitle} //OJO debe ir siempre el newTitle porque si no mostrara los cambios del titulo
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
									// se crea este disabled para reafirmar la seguridad de que no se envie cuando el titlo esta vacio
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
