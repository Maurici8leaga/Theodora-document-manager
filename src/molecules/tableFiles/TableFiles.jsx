import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// static data
import { BsPencil, BsTrash3, BsSearch } from "react-icons/bs";
// css
import "../tableFiles/TableFiles.css";

const TableFiles = (prop) => {
	const { idFile, title, fileType, date, setIdFile } = prop;

	// Format the date
	const dateFormated = moment(date).format("L");

	const navigate = useNavigate();

	const watchFile = (id) => {
		navigate(`/visualizer/${id}`);
	};

	return (
		<>
			<li className="list-group-item d-flex justify-content-between align-items-center">
				<span className="d-flex text-center item-list-width">
					<span className="span-item-list-width">{title}</span>
				</span>
				<div className="d-flex text-center item-list-width">
					<span className="span-item-list-width">{fileType}</span>
				</div>
				<span className="d-flex text-center item-list-width">
					<span className="span-item-list-width">{dateFormated}</span>
				</span>
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
