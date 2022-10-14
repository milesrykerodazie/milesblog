import { Navigate, Outlet } from 'react-router-dom';

//get stuff from localeStorage
const useAuth = () => {
   let user: any;

   const userRole = localStorage.getItem('user');

   if (userRole) {
      user = JSON.parse(userRole);
   }

   if (user) {
      return {
         auth: true,
         role: user.role,
      };
   } else {
      return {
         auth: false,
         role: null,
      };
   }
};

//protected Route state
type ProtectedRouteType = {
   authRole?: 'Admin';
};

const PrivateRoutes = ({ authRole }: ProtectedRouteType) => {
   console.log('auth role');

   const { auth, role } = useAuth();

   // return authRole === role ? <Outlet /> : <Navigate to='/' />;
   return <Outlet />;
};

export default PrivateRoutes;
