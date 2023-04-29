import '../bootstrap';
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import '../styles/app.css';
import {
    BrowserRouter,
    createBrowserRouter, Route,
    RouterProvider, Routes,
} from "react-router-dom";

//PAGES
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/Customers";
import InvoicesPage from "./pages/InvoicesPage";
import Login from "./pages/login";
import ErrorPage from "./pages/errorPage";
import Navbar from "./component/Navbar";
import AuthApi from "./services/authApi";


// const [isAuthenticated,setAuthenticated]=useState(false);
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element:  <Homepage isAuthenticated={isAuthenticated} onLogin={setAuthenticated} />,
//         errorElement: <ErrorPage />,
//     },
//     {
//         path: "/customers",
//         element: <CustomersPage />,
//
//     },
//     {
//         path: "/invoices",
//         element: <InvoicesPage />,
//
//     },
//     {
//         path: "/login",
//         element: <Login />,
//
//     },
// ]);
//
//
// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <RouterProvider router={router} />
//     </React.StrictMode>
// );
AuthApi.setUp();

const MyApp = () => {
    //todo demander par defaut à api auth si on est connecte ou pas
    const [isAuthenticated,setAuthenticated] = useState(AuthApi.isAuthenticated);
    console.log(isAuthenticated);
    const router = createBrowserRouter([
        {
            path: "/",
            element:  (
                <>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated} />
                    <HomePage />
                </>
            ),
            errorElement: <ErrorPage />,
        },
        {
            path: "/customers",
            element: (
                <>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated} />
                    <CustomersPage />
                </>
            ),
        },
        {
            path: "/invoices",
            element: (
                <>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated}/>
                    <InvoicesPage />
                </>
            ),
        },
        {
            path: "/login",
            element: (
                <>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated} />
                    <Login onLogin={setAuthenticated} />
                </>
            ),
        },
    ]);

    return (

        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MyApp />);