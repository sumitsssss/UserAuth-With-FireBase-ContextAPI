import React, { useEffect, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";
import { useState } from "react";

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {
  const [state, setState] = useState({ user: null });

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      setState({ user: user });
    });
  }, []);
  const { user } = state;
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
