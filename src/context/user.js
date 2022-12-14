import React, { createContext, useContext, useState } from "react";

const defaultUser = {
  name: null,
  lastname: null,
  email: null,
  userInfo: ()=> null,
}; // initial state

export const AuthContext = createContext(defaultUser);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  const setUserInfo = (user) =>{
    setUser({name:user.name, lastname: user.lastname, email: user.email})
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };
