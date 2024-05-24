import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import { EventProvider } from "./contexts/EventContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <EventProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />

    <RouterProvider router={router} />
  </EventProvider>
);
