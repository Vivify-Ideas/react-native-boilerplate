import React, { createContext, useEffect, useState } from 'react'
import { useGetUserQuery } from 'queries/user'
import { User } from 'types/backend'

type UserContextProps = {
  user?: User
  refetch: () => void
  isLoading: boolean
  isFetched: boolean
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  refetch: () => {},
  isLoading: false,
  isFetched: false
})

type UserContextProviderProps = {
  children: React.ReactNode
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    data,
    refetch,
    isFetched,
    isLoading: queryIsLoading
  } = useGetUserQuery(
    () => {
      setIsLoading(false)
    },
    () => {
      setIsLoading(false)
    }
  )

  useEffect(() => {
    setIsLoading(false)
  }, [data])

  return (
    <UserContext.Provider
      value={{
        user: data,
        refetch,
        isFetched,
        isLoading: queryIsLoading || isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
