import React from "react";
import { useNavigate } from "react-router-dom";
// static data
import { BsPencil, BsTrash3, BsSearch } from "react-icons/bs";

const TableFiles = (prop) => {
	const { idFile, title, fileType, setIdFile } = prop;

	const navigate = useNavigate();

	const watchFile = (id) => {
		navigate(`/visualizer/${id}`);
	};

	return (
		<>
			<li className="list-group-item d-flex justify-content-between align-items-center">
				<span className="d-flex">{title}</span>
				<span className="d-flex">{fileType}</span>
				<span className="d-flex flex-row gap-3 justify-content-end">
					<button
						type="button"
						className="btn btn-outline-warning d-flex text-center"
						data-bs-toggle="modal"
						data-bs-target="#editModal"
						onClick={() => setIdFile(idFile)}
					>
						<BsPencil />
					</button>

					<button
						type="button"
						className="btn btn-outline-info d-flex text-center"
						onClick={() => watchFile(idFile)}
					>
						<BsSearch />
					</button>

					<button
						type="button"
						className="btn btn-outline-danger d-flex"
						data-bs-toggle="modal"
						data-bs-target="#deleteModal"
						onClick={() => setIdFile(idFile)}
					>
						<BsTrash3 />
					</button>
				</span>
			</li>
		</>
	);
};

export default TableFiles;
