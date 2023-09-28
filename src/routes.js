import { useRoutes } from "react-router-dom";
import Login from "./atoms/auth/Login";
import DocumentManager from "./atoms/document-manager/DocumentManager";

export const AppRouter = () => {
	const elements = useRoutes([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/document-manager",
			element: <DocumentManager />,
		},
	]);

	return elements;
};
