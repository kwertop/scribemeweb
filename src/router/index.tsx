import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import { AuthProvider } from "../common/contexts/AuthContext";
import AppContext from '../common/contexts/AppContext';

const Router = () => {

  const dashboardRoutes = [
    {
      path: '/dashboard',
      component: lazy(() => import('../views/dashboard/Default'))
    },
    {
      path: '/notes/:code',
      component: lazy(() => import('../views/notes/MeetingNote'))
    },
    {
      path: '/notes',
      component: lazy(() => import('../views/notes/MeetingList'))
    },
    {
      path: '/trash',
      component: lazy(() => import('../views/notes/TrashMeetings'))
    },
    {
      path: '/preferences',
      component: lazy(() => import('../views/Settings'))
    },
    {
      path: '/search',
      component: lazy(() => import('../views/notes/SearchResults'))
    }
  ];

  return (
    <AppContext.Provider value={{ dashboardRoutes }}>
      <AuthProvider>
        <Suspense fallback={null}>
          <Styles />
          <Header />
          <Switch>
            {routes.map((routeItem) => {
              return (
                <Route
                  key={routeItem.component}
                  path={routeItem.path}
                  exact={routeItem.exact}
                  component={lazy(() => import(`../pages/${routeItem.component}`))}
                />
              );
            })}
          </Switch>
          <Footer />
        </Suspense>
      </AuthProvider>
    </AppContext.Provider>
  );
};

export default Router;
