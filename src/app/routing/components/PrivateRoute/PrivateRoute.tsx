import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '@takamol/react-qiwa-core';
import { useSelector } from 'react-redux';

import { ErrorRoute } from './../../enums/AuthRoute.enum';

export const PrivateRoute = (props: any) => {
  const { isAuthorized, hasServicePermission } = useAuth();
  const user = useSelector((state: any) => state.user);
  const role = useSelector((state: any) => state.role);
  const roleKey = role?.role ? role?.role : 'USER';
  const { session, company } = useAuth();
  if (!isAuthorized) {
    return <Navigate to={ErrorRoute.unauthorized} />;
  }

  if (!hasServicePermission) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }
  if (company == null) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  return <Route {...props} />;
};
