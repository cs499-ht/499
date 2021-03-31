import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

// useAuth hook to access AuthContext instead of rewriting it in every component
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    // returns a promise
    // firebase has its own way to notify when user gets set
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // explicitly tell firebase to use session storage
  // verify if user signs in, firebase connects user for you and uses onAuthStateChange
  function login(email, password) {
    return auth.setPersistence("session").then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    });
  }

  // MODIFY AUTH STATE PERSISTANCE
  function logout() {
    //explicitly clear session storage; otherwise it stays after signing out
    sessionStorage.clear();
    return auth.signOut;
  }

  function updateEmail(email) {
    return user.updateEmail(email);
  }

  function updatePassword(password) {
    return user.updatePassword(password);
  }

  // can't set display name when creating an account for the first time, have to update after user is authorized
  function updateDisplayName(displayName) {
    return user.updateProfile({ displayName: displayName });
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

  // data/functions to export
  const value = {
    user,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword,
    updateDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* only render children if not loading */}
      {/* this combined with setUser before setLoading means nothing gets rendered until user is set for the very first time */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
