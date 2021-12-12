import { lazy } from "react";
import { SettingsProvider } from '../../common/utils/useSettings';
import { Redirect } from 'react-router-dom';
import AuthGuard from "../../auth/AuthGuard";

const AdminTheme = lazy(() => import("../../common/AdminTheme"));
const AdminLayout = lazy(() => import("../../components/AdminLayout"));

const redirectRoute = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/default" />,
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />,
  }
];

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard/Default'))
  }
];

const Dashboard = () => {
  return (
    <AuthGuard>
      <SettingsProvider>
        <AdminTheme>
          <AdminLayout />
        </AdminTheme>
      </SettingsProvider>
    </AuthGuard>
  );
}

export default Dashboard;