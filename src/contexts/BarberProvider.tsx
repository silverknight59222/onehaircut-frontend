import { UserType } from '@/api/auth';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';

interface BarberProps {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}
const defaultValue = { page: 1 } as unknown as BarberProps;
const BarberContext = React.createContext<BarberProps>(defaultValue);

const BarberProvider = ({ children }: any) => {
  const defaultUser: UserType = {
      email: '',
      id: 0,
      name: '',
      phone: '',
      role: '',
      hair_salon: null
  }
  const [user, setUser] = useState<UserType>(defaultUser);
  
  return (
    <BarberContext.Provider value={{ user, setUser }}>
      {children}
    </BarberContext.Provider>
  );
};

export const useBarber = (): BarberProps => {
  return useContext<BarberProps>(BarberContext);
};
export default BarberProvider;
