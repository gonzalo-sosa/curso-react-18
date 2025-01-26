import { useContext } from 'react';
import AuthContext from './authContext';

export default function () {
  return useContext(AuthContext);
}
