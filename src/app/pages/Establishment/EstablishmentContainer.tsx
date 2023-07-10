import React from 'react';
import { useSelector } from 'react-redux';

import { EstablishmentList } from '../Establishment/Establishment';

export const EstablishmentContainer = () => {
  const user = useSelector((state: any) => state.user);
  console.log('userData', user);
  return <EstablishmentList />;
};
