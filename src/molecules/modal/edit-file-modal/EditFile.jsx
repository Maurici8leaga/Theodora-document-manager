import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDocument } from "../../../redux-toolkit/reducers/files/files.reducer";
import { fileService } from "../../../services/api/files.service";

const EditFile = (prop) => {
	const { idFile, arrayDocuments } = prop;
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState("");
	const [oldTitle, setOldTitle] = useState("");
	const [errorMsg, setErrorMsg] = useState({
		status: false,
		msg: "",
	});

	const updateFile = async (event) => {
		try {
			event.preventDefault();

			if (newTitle.length > 0) {
				// se envia el id del file y solo el title actualizado
				const res = await fileService.updateFile(idFile, {
					title: newTitle,
				});

				dispatch(
					// aqui se usa el action de update para actualizar el document
					updateDocument(res.data.file)
				);
				setErrorMsg({ status: false, msg: "" });
			} else {
				setErrorMsg({ status: true, msg: "Title can not be empty" });
			}
		} catch (error) {
			// de esta forma podemos mostrar el mensaje que viene del back
			setErrorMsg({ status: true, msg: error?.response?.data.message });
			console.log(error.stack);
		}
	};

	useEffect(() => {
		if (idFile !== undefined && arrayDocuments) {
			const fileSelected = arrayDocuments.find((item) => item._id === idFile);
			if (fileSelected) {
				// al cargar cada modal para editar este buscara y establecera el titulo viejo del documento
				setOldTitle(fileSelected.title);
				// y se coloca el titulo nuevo como "" para que reseteé y asi no recuerde el titulo del archivo anterior clickeado
				// en caso de que se cambie varios titulos
				setNewTitle("");
			}
		}
	}, [idFile, arrayDocuments]);

	const handleClose = () => {
		// se le pasa al new title el titulo viejo ya que cancelo o cerro el modal
		// esto es porque si se deja el "setNewTitle(newTitle)" va a guarda el input con el cambio y no deberia porque cancelo o cerro
		setNewTitle(oldTitle);
		setErrorMsg({ status: false, msg: "" });
	};

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
								value={newTitle} //OJO debe ir siempre el newTitle porque si no mostrara los cambios del titulo
								className="form-control mb-4"
								placeholder={`${oldTitle}`} //se le pasa el titulo viejo como placeholder para que muestre como estaba antes de ser modificado
								onChange={(event) => setNewTitle(event.target.value)}
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
									onClick={handleClose}
								>
									Close
								</button>
								<button
									type="submit"
									className="btn btn-outline-primary"
									data-bs-dismiss={`${errorMsg.status ? "modal" : null}`}
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
