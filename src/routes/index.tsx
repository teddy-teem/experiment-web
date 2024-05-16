import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import PageDetails from "../pages/pageDetails";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:pageId",
    element: <PageDetails />,
  },
]);
