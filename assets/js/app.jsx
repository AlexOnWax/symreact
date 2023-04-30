import '../bootstrap';
import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import '../styles/app.css';
import {
    createBrowserRouter, Navigate,
    Outlet, redirect, RouterProvider,
} from "react-router-dom";

//PAGES
import HomePage from "./pages/HomePage";
import CustomersPage from "./pages/Customers";
import InvoicesPage from "./pages/InvoicesPage";
import Login from "./pages/login";
import ErrorPage from "./pages/errorPage";
import Navbar from "./component/Navbar";
import AuthApi from "./services/authApi";



AuthApi.setUp();

const MyApp = () => {
    //todo demander par defaut à api auth si on est connecte ou pas
    const [isAuthenticated,setAuthenticated] = useState(AuthApi.isAuthenticated);
    const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login' }) => {
        if (!isAuthenticated) {
            return <Navigate to={redirectPath} replace />;
        }
        return <Outlet />;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element:  (
                <>
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                    </ProtectedRoute>
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
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                    </ProtectedRoute>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated} />
                    <CustomersPage />
                </>
            ),
        },
        {
            path: "/invoices",
            element: (
                <>
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                    </ProtectedRoute>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated}/>
                    <InvoicesPage />
                </>
            ),
        },
        {
            path: "/login",
            element: (
                <>
                    <Navbar isAuthenticated={isAuthenticated} onLogout={setAuthenticated} redirect={redirect}  />
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


// return (
//     <>
//
//         <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/invoices" element={<InvoicesPage />} />
//             <Route path="/Customers" element={<Customers />} />
//             <Route path="/login" element={<Login />} />
//         </Routes>
//     </>);
// }
// ReactDOM.render(
//     <BrowserRouter>
//         <Navbar />
//         <MyApp />
//     </BrowserRouter>,
//     document.getElementById('root')
// );