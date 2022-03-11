import { lazy } from "react";
import AdminSuspense from "../../components/AdminSuspense";
import ErrorFallback from '../../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { searchResource } from '../../resources/external/ApiResource';
import { useParams } from 'react-router-dom';

const SearchResultCards = lazy(() => import("../dashboard/shared/SearchResultCards"));

const SearchResults = () => {
  // let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(
    window ? window.location.search : {}
  );
  const query: string = params.get('query') ? String(params.get('query')) : '';

  return (
    <AdminSuspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="analytics m-sm-30 mt-6">
          <h4 className="card-title mb-4">
            {`Search Results for '${query}'`}
          </h4>
          <SearchResultCards resource = { searchResource(query) } />
        </div>
      </ErrorBoundary>
    </AdminSuspense>
  );
}

export default SearchResults;