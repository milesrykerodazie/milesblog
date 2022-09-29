import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import BlogPage from './pages/BlogPage';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PersistLogin from './components/PersistLogin';
import Register from './pages/Register';
import ResetPasword from './pages/ResetPasword';
import VerifyEmail from './pages/VerifyEmail';
import Contact from './pages/Contact';
import About from './pages/About';

const App = () => {
   return (
      <Routes>
         <Route element={<PersistLogin />}>
            <Route path='/' element={<Layout />}>
               <Route index element={<Home />} />
               <Route path='/about' element={<About />} />
               <Route path='/contact' element={<Contact />} />
               <Route path='blog'>
                  <Route index element={<BlogPage />} />
               </Route>
            </Route>
         </Route>
         <Route path='auth'>
            <Route index element={<Register />} />
            <Route path='verifyemail' element={<VerifyEmail />} />
            <Route path='login' element={<Login />} />
            <Route path='forgotpassword' element={<ForgotPassword />} />
            <Route path='resetpassword' element={<ResetPasword />} />
         </Route>
      </Routes>
   );
};

export default App;
