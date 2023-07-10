import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const RouterProvider = ({ children }: PropsWithChildren) => {
  return <Router>{children}</Router>;
};
