/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import store from './store';
import { Provider } from 'react-redux';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: (
      <Provider store={store}>
        <Dashboard />
      </Provider>
    ),
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "10K AI Summary",
    icon: "nc-icon nc-glasses-2",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Fundamentals",
    icon: "nc-icon nc-chart-pie-36",
    component: <Maps />,
    layout: "/admin",
  }
];
export default routes;
