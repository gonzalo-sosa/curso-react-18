import NavBar from '@/components/ui/navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
