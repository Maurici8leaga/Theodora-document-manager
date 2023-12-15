import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../molecules/loader/Loader";
import CreateFile from "../../molecules/modal/create-file-modal/CreateFile";
import EditFile from "../..//molecules/modal/edit-file-modal/EditFile";
import DeleteFile from "../../molecules/modal/delete-file/DeleteFile";
import TableFiles from "../../molecules/tableFiles/TableFiles";
import Navbar from "../../molecules/navbar/Navbar";
import Login from "../auth/Login";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fileService } from "../../services/api/files.service";
import { getDocument } from "../../redux-toolkit/reducers/files/files.reducer";
import UploadIcon from "../../assets/upload.png";
import { emptyBoxImg } from "../../services/utils/static.data";
import "../document-manager/DocumentManager.css";
import "../../index.css";

const DocumentManager = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get files from store
	const files = useSelector((state) => state.files.documents);

	// state for authentication
	const [tokeAuthentication] = useLocalStorage("token", "get");
	const [titleFile, setTitlefile] = useState("");
	const [idFile, setIdFile] = useState("");

	// state for errors
	const [hasError, setHasError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	// state for loader
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!tokeAuthentication) {
			navigate("/");
		}

		// function for request files to API
		const fetchFiles = async () => {
			setLoading(true);
			try {
				const response = await fileService.getFiles();
				dispatch(getDocument(response.data.files));
				setLoading(false);
			} catch (error) {
				console.log(error.stack);
				setLoading(false);
				setHasError(true);
				setErrorMsg(error.response.data.message);
			}
		};

		fetchFiles();

		// instance for reset message error
		if (hasError && errorMsg) {
			const timeout = setTimeout(() => {
				setHasError(false);
				setErrorMsg("");
			}, 5000);

			return () => clearTimeout(timeout);
		}
	}, [dispatch, navigate, tokeAuthentication, hasError, errorMsg]);

	return (
		<>
			{tokeAuthentication ? (
				<div className="bg-custom">
					<Navbar />

					<div className="container-md mt-5 vh-100">
						<div className="container-custom">
							{hasError && errorMsg && (
								<div
									className="alert alert-danger alert-dismissible"
									role="alert"
								>
									<div>{errorMsg}</div>
								</div>
							)}

							<div className="card text-center bg-card">
								<div className="card-body">
									<h3 className="card-title">Library</h3>
									<figure className="text-center">
										<img
											src={UploadIcon}
											alt="upload icon"
											style={{ width: "110px" }}
										/>
									</figure>
									<p className="card-text">Upload your files here.</p>
									<button
										type="button"
										className="btn btn-outline-primary"
										data-bs-toggle="modal"
										data-bs-target="#createModal"
									>
										Choose a file from your computer
									</button>
								</div>
							</div>
							<CreateFile
								titleFile={titleFile}
								setTitlefile={setTitlefile}
								setHasError={setHasError}
								setErrorMsg={setErrorMsg}
								setLoading={setLoading}
							/>

							<EditFile
								idFile={idFile}
								arrayDocuments={files}
								setHasError={setHasError}
								setErrorMsg={setErrorMsg}
								setLoading={setLoading}
							/>

							<DeleteFile
								idFile={idFile}
								arrayDocuments={files}
								setHasError={setHasError}
								setErrorMsg={setErrorMsg}
								setLoading={setLoading}
							/>

							{loading ? (
								<div className="mt-5">
									<Loader />
								</div>
							) : (
								<div className="text-center mt-5">
									{files.length === 0 ? (
										<figure className="text-center">
											<h5>No files yet</h5>
											<img
												src={emptyBoxImg}
												alt=" icon"
												style={{ width: "150px" }}
											/>
										</figure>
									) : (
										<div className="bg-lilac rounded-top p-2 mb-2">
											<li className="list-group-item d-flex justify-content-around align-items-center">
												<span className="d-flex">NAME</span>
												<span className="d-flex">FORMAT</span>
												<span className="d-flex">CREATED</span>
												<span className="d-flex">OPCION</span>
											</li>
										</div>
									)}

									<ul className="list-group gap-2">
										{files && files.length > 0 ? (
											files.map((item, index) => (
												<TableFiles
													key={index}
													idFile={item._id}
													title={item.title}
													fileType={item.fileType}
													date={item.createAt}
													setIdFile={setIdFile}
												/>
											))
										) : (
											<></>
										)}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<Login />
			)}
		</>
	);
};

export default DocumentManager;
