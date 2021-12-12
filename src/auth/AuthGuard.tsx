import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import useAuth from '../common/utils/useAuth';

interface Props {
  children?: any;
}

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  const [ previouseRoute, setPreviousRoute ] = useState<string | null>(null);
  const { pathname } = useLocation();

  let authenticated = isAuthenticated;

  useEffect(() => {
    if (previouseRoute !== null) setPreviousRoute(pathname);
  }, [pathname, previouseRoute]);

  if (authenticated) return <>{children}</>
  else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { redirectUrl: previouseRoute },
        }}
      />
    );
  }
}

export default AuthGuard;
