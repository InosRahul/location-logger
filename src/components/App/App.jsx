import React from 'react';
import { useEffect } from 'react';
import { Login, Signup, LocationLog } from 'components';
import { useAuth, useResolved } from 'hooks';
import { Route, Switch, useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authUser, authResolved, history]);
  return authResolved ? (
    <div className="app">
      <Switch>
        <Route path="/" exact component={LocationLog} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  ) : (
    <>Loading...</>
  );
};
