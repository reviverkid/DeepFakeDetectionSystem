import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './AuthService'; 

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        )
      }
    />
  );
};

export default PrivateRoute;
