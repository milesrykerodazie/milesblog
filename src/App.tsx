import { Routes, Route, Navigate } from 'react-router-dom';
import BlogLayout from './components/layout/BlogLayout';
import Layout from './components/layout/Layout';
import BlogPage from './pages/BlogPage';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PersistLogin from './components/PersistLogin';
import Register from './pages/Register';
import ResetPasword from './pages/ResetPasword';
import VerifyEmail from './pages/VerifyEmail';
import { useAppSelector } from './redux/app/store';
import { selectCurrentToken } from './redux/features/auth/authSlice';
const App = () => {
   const token = useAppSelector(selectCurrentToken);
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route element={<PersistLogin />}>
               <Route index element={<Home />} />
               <Route path='blog' element={<BlogLayout />}>
                  <Route index element={<BlogPage />} />
               </Route>
               <Route path='verifyemail' element={<VerifyEmail />} />
            </Route>
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='resetpassword' element={<ResetPasword />} />
         </Route>
      </Routes>
   );
};

export default App;
