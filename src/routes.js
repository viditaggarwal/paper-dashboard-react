import Dashboard from "views/Dashboard.js";
import Homepage from "views/Homepage.js";
import store from './store';
import { Provider } from 'react-redux';

var routes = [
  {
    path: "/:stockName",
    name: "Details",
    icon: "nc-icon nc-bank",
    component: (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ),
    layout: "/",
  },
  {
    path: "/",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: (
      <Provider store={store}>
        <Homepage />
      </Provider>
    ),
    layout: "/",
  },
];
export default routes;