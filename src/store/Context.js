import { createContext, useState } from 'react';
import firebase from '../firebase/config';

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState('');

  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}
