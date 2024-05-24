import { createBrowserRouter } from "react-router-dom";
import ImportPage from "./pages/import";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ImportPage />,
  },
]);
