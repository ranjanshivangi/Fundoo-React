import SignUp from '../../pages/signuppage/SignUp';
import Login from '../../pages/loginpage/Login';
import Dashboard from '../../pages/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Protectedroute';
import AuthRoute from './AuthRouter';

function FundooRoutes() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<AuthRoute><SignUp/></AuthRoute>}/>
      <Route path="/login" element={<AuthRoute><Login/></AuthRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
      
    </>
  );
}



export default FundooRoutes;