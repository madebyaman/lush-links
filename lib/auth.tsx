import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { IUser } from '@/types/types';
import { useRouter } from 'next/router';
import {
  checkUsernameAvailability,
  createOrUpdateUser,
  getUserProfile,
} from './db';

const authContext = createContext<{
  user: IUser | null;
  signout: any;
  signinWithGoogle: any;
  loading: boolean;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = async (rawUser: User | null) => {
    if (rawUser) {
      const userProfile = await getUserProfile(rawUser.uid);
      const user = await formatUser(rawUser, userProfile?.username);
      createOrUpdateUser(user.uid, user);
      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(null);
      return false;
    }
  };

  const signout = async () => {
    await auth.signOut();
    return handleUser(null);
  };

  const signinWithGoogle = async (redirect: string) => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    handleUser(response.user);
    if (redirect) {
      router.push(redirect);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((state) => handleUser(state));

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGoogle,
    loading,
    signout,
  };
}

async function formatUser(user: User, username: string): Promise<IUser> {
  let tempUsername = '';
  if (!username) {
    let tempUsername =
      user.email?.split('@')[0] ??
      user.displayName?.replace(/\s+/g, '-').toLowerCase() ??
      '';
    const usernameAvailable = await checkUsernameAvailability(
      tempUsername,
      user.uid
    );

    if (!usernameAvailable) {
      tempUsername += `${Math.floor(Math.random() * 1000)}`;
    }
  }

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    username: username ?? tempUsername,
  };
}
