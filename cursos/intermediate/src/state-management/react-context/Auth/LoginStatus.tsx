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
            href="#"
          >
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a
        onClick={() =>
          dispatch({ type: AuthActionTypes.LOGIN, payload: 'mosh.hamedani' })
        }
        href="#"
      >
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
