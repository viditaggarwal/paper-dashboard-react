import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import SecSummary from "views/SecSummary.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
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
