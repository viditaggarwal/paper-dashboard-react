import Dashboard from "views/Dashboard.js";
import SecSummary from "views/SecSummary.js";
import store from './store';
import { Provider } from 'react-redux';

var routes = [
  {
    path: "/",
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
    path: "/secsummary",
    name: "10K AI Summary",
    icon: "nc-icon nc-glasses-2",
    component: (
      <Provider store={store}>
        <SecSummary />
      </Provider>
    ),
    layout: "/",
  }
];
export default routes;
