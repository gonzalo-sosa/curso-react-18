import { ReactNode, useReducer } from 'react';
import { AuthAction, AuthActionTypes, User } from './Auth.model';
import AuthContext from './authContext';

function authReducer(user: User, action: AuthAction): User {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return action.payload;
    case AuthActionTypes.LOGOUT:
      return '';
    default:
      return user;
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, dispatch] = useReducer(authReducer, '');

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
