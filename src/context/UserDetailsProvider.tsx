import React, { createContext, useState } from 'react';
import { UserDefault, userDefault } from '@/context/DefaultValue'

export const userDetailsContext = createContext<any>({});

const UserDetailsProvider = (props: any) => {
  const [userDetails, setUserDetails] = useState(userDefault);

  return (
    <userDetailsContext.Provider value={[userDetails, setUserDetails]}>
      {props.children}
    </userDetailsContext.Provider>
  );
};

export default UserDetailsProvider;