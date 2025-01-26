import { createContext, Dispatch } from 'react';
import { AuthAction, User } from './Auth.model';

type AuthContextType = {
  user: User;
  dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export default AuthContext;
