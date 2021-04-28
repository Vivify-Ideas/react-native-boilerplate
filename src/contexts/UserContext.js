import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import { useGetUser } from '../queries/user';

export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { data, refetch, isLoading: queryIsLoading } = useGetUser(
    () => {
      setIsLoading(false);
    },
    () => {
      setIsLoading(false);
    }
  );

  return (
    <UserContext.Provider
      value={{
        user: data,
        refetch,
        isLoading: queryIsLoading || isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node
};

export default UserContextProvider;
