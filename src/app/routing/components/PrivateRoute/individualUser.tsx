import React, { useEffect, useState } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from '@takamol/react-qiwa-core';
import { useSelector } from 'react-redux';
import { ErrorRoute, ROUTES, SPECIALISTROUTE } from '../../enums/AuthRoute.enum';
export const IndividualUser = (props: any) => {
  const { isAuthorized, hasServicePermission, userRole, isLoadingAuth } = useAuth();
  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.user);
  const role = useSelector((state: any) => state.role);
  const roleKey = role?.role ? role?.role : 'USER';
  const { session, company } = useAuth();
  console.log('useAuth()', useAuth());

  if (!isAuthorized) {
    return <Navigate to={ErrorRoute.unauthorized} />;
  }

  if (!hasServicePermission) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  if (!session?.states.includes('ohs-representative')) {
    return <Navigate to={ErrorRoute.forbidden} />;
  }

  return <Route {...props} />;
};
