import { lazy } from "react";
import AdminSuspense from "../../components/AdminSuspense";
import ErrorFallback from '../../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { meetingListResource } from '../../resources/external/ApiResource';

const MeetingCards = lazy(() => import("../dashboard/shared/MeetingCards"));

const MeetingList = () => {

  return (
    <AdminSuspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="analytics m-sm-30 mt-6">
          <h4 className="card-title mb-4">
            My Meetings
          </h4>
          <MeetingCards resource = { meetingListResource() } showCheckBox={true} isList={true}/>
        </div>
      </ErrorBoundary>
    </AdminSuspense>
  );
}

export default MeetingList;