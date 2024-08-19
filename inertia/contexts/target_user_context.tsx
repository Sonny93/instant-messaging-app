import { createContext, PropsWithChildren } from 'react';
import type { User } from '~/types/app';

type TransmitContextType = {
  targetUser?: User;
};
export const TargetUserContext = createContext<TransmitContextType>({
  targetUser: undefined,
});

export const TargetUserContextProvider = ({
  children,
  targetUser,
}: PropsWithChildren & TransmitContextType) => (
  <TargetUserContext.Provider value={{ targetUser }}>
    {children}
  </TargetUserContext.Provider>
);
