const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login"
  },
  {
    path: ["/dashboard"],
    exact: true,
    component: "Dashboard"
  }
];

export default routes;
