// import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from '../features/auth/authSlice';
// import { RootState } from '../redux/store';

// interface UseAuthResult {
//   user: User | null;
//   isAuthenticated: boolean;
//   handleLogin: (username: string, password: string) => void;
//   handleLogout: () => void;
// }

// const useAuth = (): UseAuthResult => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const isAuthenticated = Boolean(user);

//   const handleLogin = (username: string, password: string) => {
//     dispatch(login({ username, password }));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return {
//     user,
//     isAuthenticated,
//     handleLogin,
//     handleLogout,
//   };
// };

// export default useAuth;
