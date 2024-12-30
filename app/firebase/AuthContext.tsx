'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);// you need to update the type of the user state to accept both User and null.
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get the ID token
        const token = await user.getIdToken();
        
        // Set the session cookie
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};















// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '@/app/firebase/firebase';

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
// });

// export function AuthContextProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);