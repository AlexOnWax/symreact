
import '../bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import '../styles/app.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
// start the Stimulus application


import HomePage from "./pages/HomePage";

import CustomersPage from "./pages/Customers";
import InvoicesPage from "./pages/InvoicesPage";
import Login from "./pages/login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/customers",
        element: <CustomersPage />,
    },
    {
        path: "/invoices",
        element: <InvoicesPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <main className="container pt-5">
            <RouterProvider router={router} />
        </main>
    </React.StrictMode>
)