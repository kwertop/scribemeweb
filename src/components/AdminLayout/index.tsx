import React from 'react';
import AdminSuspense from '../AdminSuspense';
import { useSettings } from '../../common/utils/useSettings';
import GlobalCss from '../../adminstyles/GlobalCss';

const Layout: any = React.lazy(() => import('../Layout'));

const AdminLayout = (props: any) => {
  const { settings } = useSettings();

  return (
    <AdminSuspense>
      <GlobalCss />
      <Layout {...props} />
    </AdminSuspense>
  );
}

export default AdminLayout;
