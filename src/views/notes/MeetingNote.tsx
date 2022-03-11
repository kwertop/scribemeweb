import { lazy } from "react";
import AdminSuspense from "../../components/AdminSuspense";
import ErrorFallback from '../../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { meetingNoteResource } from '../../resources/external/ApiResource';
import { useParams } from 'react-router-dom';

const AdminMeetingNote = lazy(() => import("../../components/AdminMeetingNote"));

const MeetingNote = () => {
  const { code }: any = useParams();

  return (
    <AdminSuspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AdminMeetingNote resource = { meetingNoteResource(code) }/>
      </ErrorBoundary>
    </AdminSuspense>
  );
}

export default MeetingNote;