import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPasword from './pages/ResetPasword';
import VerifyEmail from './pages/VerifyEmail';
const App = () => {
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='verifyemail' element={<VerifyEmail />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='resetpassword' element={<ResetPasword />} />
         </Route>
      </Routes>
   );
};

export default App;
