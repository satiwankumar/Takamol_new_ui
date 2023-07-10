import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '@takamol/react-qiwa-core';
import { useSelector } from 'react-redux';
import { ErrorRoute } from './../../enums/AuthRoute.enum';

export const HomeConmponent = (props: RouteProps) => {
  const user = useSelector((state: any) => state.user);
  const { session, company } = useAuth();
  if (session?.states.includes('ohs-representative')) {
    return <Navigate to="/ohs-certificate-requests" />;
  }
  if (session?.states?.includes('ohs-admin')) {
    return <Navigate to="/questions" />;
  } else if (company != null) {
    return <Navigate to="/ohs-certificate" />;
  } else {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  return <Route {...props} />;
};
