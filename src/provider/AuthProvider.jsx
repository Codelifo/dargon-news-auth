import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const createNewUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(false)
        return signOut(auth);
    }

    const signInUser = (email, password) =>{
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (updatedData) =>{
        return updateProfile(auth.currentUser, updatedData)
    }

    useEffect(()=>{
         const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
         }) 
         return () =>{
            unSubscribe();
         }
    },[])

    const authInfo = {
        createNewUser,
        logOut,
        user, 
        signInUser,
        loading,
        updateUserProfile

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;