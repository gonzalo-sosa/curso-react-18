import { AuthActionTypes } from './Auth.model';
import useAuth from './useAuth';

const LoginStatus = () => {
  const { user, dispatch } = useAuth();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a
            onClick={() => dispatch({ type: AuthActionTypes.LOGOUT })}
            href="#login-status"
          >
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div id="login-status">
      <h3>Login Status</h3>
      <a
        onClick={() =>
          dispatch({ type: AuthActionTypes.LOGIN, payload: 'gonzalo.sosa' })
        }
        href="#login-status"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
