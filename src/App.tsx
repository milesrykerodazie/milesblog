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
import AdminDashboard from './components/AdminDashboard';
import CreatePost from './pages/CreatePost';
import PrivateRoutes from './redux/features/auth/PrivateRoutes';
import PostDetails from './pages/PostDetails';
import CategoryPosts from './pages/CategoryPosts';
import EditPost from './pages/EditPost';
import PostsPrefetch from './components/PostsPrefetch';

const App = () => {
   return (
      <Routes>
         <Route element={<PersistLogin />}>
            <Route element={<PostsPrefetch />}>
               <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/blog' element={<BlogPage />} />
                  <Route path='/category/:id' element={<CategoryPosts />} />

                  <Route path='/post/:id' element={<PostDetails />} />
                  <Route
                     path='admin'
                     element={<PrivateRoutes authRole='Admin' />}
                  >
                     <Route index element={<AdminDashboard />} />
                     <Route path='create' element={<CreatePost />} />
                     <Route path='edit/:id' element={<EditPost />} />
                  </Route>
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
