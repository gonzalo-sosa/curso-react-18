import useAuthStore from './store';

const LoginStatus = () => {
  const { user, login, logout } = useAuthStore();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => logout()} href="#zustand">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <h3>Login status</h3>
      <a onClick={() => login('gonzalo.sosa')} href="#zustand">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
