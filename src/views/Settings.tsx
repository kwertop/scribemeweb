import AdminSuspense from "../components/AdminSuspense";
import AdminTabs from "../components/AdminTabs";
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

const MeetingList = () => {

  return (
    <AdminSuspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AdminTabs />
      </ErrorBoundary>
    </AdminSuspense>
  );
}

export default MeetingList;