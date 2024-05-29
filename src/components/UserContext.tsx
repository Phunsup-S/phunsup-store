import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import liff from '@line/liff';

interface UserContextProps {
  userId: string;
  displayName: string;
  statusMessage: string;
  pictureUrl: string;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [pictureUrl, setPictureUrl] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const liffId = '2005301910-qanEWB6K';

  useEffect(() => {
    liff.init({ liffId })
      .then(() => {
        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
          liff.getProfile().then(profile => {
            setDisplayName(profile.displayName);
            setStatusMessage(profile.statusMessage ?? '');
            setPictureUrl(profile.pictureUrl ?? '');
            setUserId(profile.userId);
          }).catch(err => console.error(err));
        }
      }).catch(err => console.error(err));
  }, []);

  const login = () => {
    liff.login();
  };

  const logout = () => {
    liff.logout();
    //window.location.reload();
    window.location.href = '/';
  };

  return (
    <UserContext.Provider value={{ userId, displayName, statusMessage, pictureUrl, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
