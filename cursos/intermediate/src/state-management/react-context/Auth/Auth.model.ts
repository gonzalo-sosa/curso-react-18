export type User = string;

export const enum AuthActionTypes {
  LOGIN = 'login',
  LOGOUT = 'logout',
}

interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: User;
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT;
}

export type AuthAction = LoginAction | LogoutAction;
