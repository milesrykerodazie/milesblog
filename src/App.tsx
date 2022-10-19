import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import PersistLogin from './components/PersistLogin';
import Register from './pages/Register';
import ResetPasword from './pages/ResetPasword';
import VerifyEmail from './pages/VerifyEmail';
import Contact from './pages/Contact';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import CategoryPosts from './pages/CategoryPosts';
import EditPost from './pages/EditPost';
import PostsPrefetch from './components/PostsPrefetch';
import { useAppSelector } from './redux/app/store';
import { selectCurrentToken } from './redux/features/auth/authSlice';
import UserProfile from './pages/UserProfile';
import EditUserProfile from './pages/EditUserProfile';
import useTitle from './hooks/useTitle';
import PrivateRoutes from './redux/features/auth/PrivateRoutes';
import UsersList from './pages/UsersList';

const App = () => {
   useTitle('Blog Sample');
   const token = useAppSelector(selectCurrentToken);
   return (
      <Routes>
         <Route element={<PersistLogin />}>
            <Route element={<PostsPrefetch />}>
               <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />

                  <Route path='/category/:id' element={<CategoryPosts />} />

                  <Route path='/post/:id' element={<PostDetails />} />
                  <Route
                     path='/create-post'
                     element={
                        token ? <CreatePost /> : <Navigate replace to={'/'} />
                     }
                  />
                  <Route
                     path='/edit-post/:id'
                     element={
                        token ? <EditPost /> : <Navigate replace to={'/'} />
                     }
                  />
                  <Route path='/author/:id' element={<UserProfile />} />
                  <Route
                     path='/edit-profile/:id'
                     element={<EditUserProfile />}
                  />
                  <Route
                     path='admin'
                     element={<PrivateRoutes authRole='Admin' />}
                  >
                     <Route path='userslist' element={<UsersList />} />
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
