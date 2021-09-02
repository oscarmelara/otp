
// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import { isEmpty } from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import { AuthContextType } from './interfaces/providers/auth';

import ToggleMenuProvider from './providers/dom/navigations';
import AuthProvider, { useAuth } from './providers/auth';

import AuthLoginPage from './pages/auth/login';
import AuthForgotPage from './pages/auth/forgot';
import AuthAssingPassword from './pages/auth/recovery';
import AuthOtp  from './pages/auth/otp';

import Home from './pages/dashboard/home';

import Users from './pages/dashboard/users';
import UserCreate from './pages/dashboard/users/create';

import Aplication from './pages/dashboard/application';
import ApplicationDetails from './pages/dashboard/application/view'
import AplicationCreate from './pages/dashboard/application/create'
import AppUpdate from './pages/dashboard/application/edit'

import Operation from './pages/dashboard/operation';
import OperationDetails from './pages/dashboard/operation/view';
import OperationCreate from './pages/dashboard/operation/create'
import OperationUpdate from './pages/dashboard/operation/edit'

import ModalProvider, { useModal } from './providers/dom/modal';
import { ModalContextType } from './interfaces/providers/dom/modal';
import { useEffect } from 'react';
// -----------------------------------------------------------------------------
//   Code
// -----------------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ToggleMenuProvider>
        <ModalProvider>
          <Switch>
            {/*
             * -------------------
             *   Authentication
             * -------------------
             */}

            <PrivateRoute exact path="/" type="auth">
              <Redirect to="/auth/login" />
            </PrivateRoute>

            <PrivateRoute path="/auth/login" type="auth">
              <AuthLoginPage />
            </PrivateRoute>

            <PrivateRoute path="/auth/forgot" type="auth">
              <AuthForgotPage />
            </PrivateRoute>
            <PrivateRoute path="/auth/otp" type="auth">
              <AuthOtp />
            </PrivateRoute>

            <PrivateRoute path="/auth/nueva-contraseña" type="auth">
              <AuthAssingPassword />
            </PrivateRoute>

            {/*
            * -------------------
            *   Dashboard
            * -------------------
            */}

            <PrivateRoute path="/dashboard">
              <Home />
            </PrivateRoute>

            <PrivateRoute exact path="/usuarios">
              <Users />
            </PrivateRoute>
            <PrivateRoute path="/usuarios/crear">
              <UserCreate />
            </PrivateRoute>

            <PrivateRoute exact path="/aplicacion">
              <Aplication />
            </PrivateRoute>
            <PrivateRoute exact path="/aplicacion/detalles/:id">
              <ApplicationDetails />
            </PrivateRoute>
            <PrivateRoute path="/aplicacion/crear">
              <AplicationCreate />
            </PrivateRoute>
            <PrivateRoute path="/aplicacion/editar/:id">
              <AppUpdate />
            </PrivateRoute>

            <PrivateRoute exact path="/operacion">
              <Operation />
            </PrivateRoute>
            <PrivateRoute exact path="/operacion/detalles/:id">
              <OperationDetails />
            </PrivateRoute>
            <PrivateRoute path="/operacion/crear">
              <OperationCreate />
            </PrivateRoute>
            <PrivateRoute exact path="/operacion/editar/:id">
              <OperationUpdate />
            </PrivateRoute>
           
          </Switch>
        </ModalProvider>
        </ToggleMenuProvider>
      </Router>
    </AuthProvider>
  );
};

function PrivateRoute({ children, type, ...rest }: any): JSX.Element {
  const response: AuthContextType = useAuth();
  const getModal: ModalContextType = useModal();
  const isAuth: boolean = type === 'auth';
  const validation: boolean = (
    isAuth
      ? isEmpty(response?.user)
      : !isEmpty(response?.user)
  );

  useEffect(() => {
    getModal?.hide(getModal?.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return (
    <Route
      {...rest}
      render={() => (
        validation
          ? children
          : (
            <Redirect
              to={(
                isAuth && !validation
                  ? '/dashboard'
                  : '/auth/login'
              )}
            />
          )
      )}
    />
  );
}
