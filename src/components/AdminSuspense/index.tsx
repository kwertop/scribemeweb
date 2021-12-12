import React, { Suspense } from 'react';
import AdminLoader from '../AdminLoader';

interface Props {
  children: React.ReactNode;
}

const AdminSuspense = ({ children }: Props) => {
  return (
    <Suspense fallback={<AdminLoader />}>{children}</Suspense>
  );
};

export default AdminSuspense;
