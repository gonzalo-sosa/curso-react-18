import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

type User = string;

interface AuthStoreType {
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStoreType>((set) => ({
  user: '',
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: '' })),
}));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development')
  mountStoreDevtool('Auth Store', useAuthStore);

export default useAuthStore;
