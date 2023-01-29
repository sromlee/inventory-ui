import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../authService';
// import useAuth from '../hooks/useAuth';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});


const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        
        setUser(AuthService.getCurrentUser());
      } catch(error) {
        console.log(error)
        setUser(null);
      };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

 
export const  useAuth = () =>  useContext(AuthContext)
