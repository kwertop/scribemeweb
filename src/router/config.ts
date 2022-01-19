const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/dashboard"],
    exact: true,
    component: "Dashboard"
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login",
    toDashboard: true
  },
  {
    path: ["/signup"],
    exact: true,
    component: "Signup",
    toDashboard: true
  },
  {
    path: ["/notes/:code"],
    exact: true,
    component: "Dashboard"
  },
  {
    path: ["/notes"],
    exact: true,
    component: "Dashboard"
  },
  {
    path: ["/trash"],
    exact: true,
    component: "Dashboard"
  },
  {
    path: ["/preferences"],
    exact: true,
    component: "Dashboard"
  }
];

export default routes;
