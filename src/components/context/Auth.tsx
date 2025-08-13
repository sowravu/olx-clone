import { onAuthStateChanged } from "firebase/auth";

import type {  User } from "firebase/auth";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "../Firebase/Firebase";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const userAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, SetUser] = useState<User | null>(null);
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      SetUser(currentUser);
    });
    return Unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}  >
        {children}
     </AuthContext.Provider>
  );
};


export default AuthProvider