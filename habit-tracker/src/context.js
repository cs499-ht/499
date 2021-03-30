import React, { createContext, useEffect, useState } from 'react';
import { auth } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log(user);
            setUser(user);
    
          } else {
            setUser(null);
          }
        })
    
        return () => {
          //perform some cleanup actions
          unsubscribe();
        }
    }, [user, username]);
    // useEffect(()=>{
    //     auth.onAuthStateChanged(setUser);
    // },[]);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
