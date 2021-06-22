import React, { createContext, useEffect, useState } from 'react';
import { useGetUser } from 'queries/user';
import { UserI } from 'types';

type UserContextProps = {
  user?: UserI;
  refetch: () => void;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  refetch: () => {},
  isLoading: false,
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    data,
    refetch,
    isLoading: queryIsLoading,
  } = useGetUser(
    () => {
      setIsLoading(false);
    },
    () => {
      setIsLoading(false);
    }
  );

  useEffect(() => {
    setIsLoading(false);
  }, [data]);

  return (
    <UserContext.Provider
      value={{
        user: data,
        refetch,
        isLoading: queryIsLoading || isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
