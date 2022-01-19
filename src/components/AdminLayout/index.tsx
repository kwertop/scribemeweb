import React from 'react';
import AdminSuspense from '../AdminSuspense';
import GlobalCss from '../../adminstyles/GlobalCss';

const Layout: any = React.lazy(() => import('../Layout'));

const AdminLayout = (props: any) => {

  return (
    <AdminSuspense>
      <GlobalCss />
      <Layout {...props} />
    </AdminSuspense>
  );
}

export default AdminLayout;
