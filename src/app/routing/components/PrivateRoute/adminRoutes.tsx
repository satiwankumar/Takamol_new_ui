import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@takamol/react-qiwa-core';
import { useSelector } from 'react-redux';
import { ErrorRoute } from './../../enums/AuthRoute.enum';

export const AdminRoute = (props: any) => {
  const { isAuthorized, hasServicePermission } = useAuth();
  const pathname = useLocation();
  const { session, company } = useAuth();
  const user = useSelector((state: any) => state.user);
  const role = useSelector((state: any) => state.role);

  if (!isAuthorized) {
    return <Navigate to={ErrorRoute.unauthorized} />;
  }

  if (!hasServicePermission) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  if (!session?.states.includes('ohs-admin')) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  return <Route {...props} />;
};
