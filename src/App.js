import logo from "./logo.svg";
import "./App.css";
import SignUp from "./pages/signuppage/SignUp";
import Login from "./pages/loginpage/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FundooRoutes from "./components/routes/route";
import { Provider } from "react-redux";
import Store from "./redux/store/Store";

function App() {
  return (
    <>
      <Provider store={Store}>
        <FundooRoutes />
      </Provider>
    </>
  );
}

export default App;
