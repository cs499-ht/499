import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

// useAuth hook to access AuthContext instead of rewriting it in every component
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // returns a promise
    // firebase has its own way to notify when user gets set
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // firebase sets local storage for you
  // verify if user signs in, firebase connects user for you and uses onAuthStateChange
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut;
  }

  useEffect(() => {
    // this is where firebase notifies when user gets set
    // initialize loading state of user is null
    // this verifies if there is a user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // set user before loading so SignUp component renders properly
      setUser(user);
      setLoading(false);
    });
    // unsubscribe from onAuthStateChanged listener when component unmounts
    return unsubscribe;
  }, []);
  // useEffect(()=>{
  //     auth.onAuthStateChanged(setUser);
  // },[]);

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* only render children if not loading */}
      {/* this combined with setUser before setLoading means nothing gets rendered until user is set for the very first time */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
