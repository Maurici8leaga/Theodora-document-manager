import { useRoutes } from "react-router-dom";
import Login from "./atoms/auth/Login";

export const AppRouter = () => {
	const elements = useRoutes([
		{
			path: "/",
			element: <Login />,
		},
	]);

	return elements;
};
