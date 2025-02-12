import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: any;
  login: (role: any) => void;
  logout: () => void;
}

// Create a context for managing user state
const UserContext = createContext<UserContextType | undefined>(undefined);

// A custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider to provide context to the app
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Initially, no user logged in

  const login = (user: any) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider
