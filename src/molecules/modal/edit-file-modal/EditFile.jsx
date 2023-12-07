import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { fileService } from "../../../services/api/files.service";

const EditFile = (prop) => {
	const { idFile, arrayDocuments } = prop;
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const [cosa, setCosa] = useState("");

	const updateFile = async (event) => {
		try {
			event.preventDefault();

			// quitamos los espacios en blanco del inicio y final del titulo
			const verifyTitle = newTitle.trim();

			// se envia el id del file y solo el title actualizado
			const res = await fileService.updateFile(idFile, {
				title: verifyTitle,
			});

			dispatch(
				// aqui se usa el action de update para actualizar el document
				updateDocument(res.data.file)
			);
			setErrorMsg("");

			setCosa("modal");
			setErrorMsg("");
		} catch (error) {
			setCosa(null);
			// de esta forma podemos mostrar el mensaje que viene del back
			setErrorMsg({ status: true, msg: error.response.data.message });
			console.log(error.stack);
		}
	};

	useEffect(() => {
		// ESTA EN VERREMOS ESTA FUNCIONALIDAD
		// if (idFile !== undefined && arrayDocuments) {
		// 	const fileSelected = arrayDocuments.find((item) => item._id === idFile);
		// 	// if (fileSelected) {
		// 	// 	console.log("setenndo el new title");
		// 	// 	// al cargar cada modal para editar este buscara y establecera el titulo viejo del documento
		// 	// }
		// }
		setNewTitle("");
		// para que cuando habra el modal no exista error antiguos
		// setErrorMsg({ status: false, msg: "" });
	}, [idFile, arrayDocuments, errorMsg]);

	const prueba = (event) => {
		if (event.length > 0 && event.length < 15) {
			setNewTitle(event);
			setErrorMsg("");
		} else {
			setErrorMsg({
				status: true,
				msg: " should have  2 and 15 characterTitles",
			});
		}
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
								onChange={(event) => prueba(event.target.value)}
							/>

							{errorMsg ? (
								<label className="form-label text-danger">{errorMsg.msg}</label>
							) : (
								<></>
							)}

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
									data-bs-dismiss={cosa}
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
