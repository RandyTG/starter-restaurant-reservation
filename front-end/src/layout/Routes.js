import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../newResevation/NewReservation";
import NewTable from "../newTable/NewTable";
import ManageReservation from "../manageReservation/ManageReservation";
import SearchReservation from "../searchReservation/SearchReservation";
import EditReservation from "../editReservation/EditReservation";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <ManageReservation />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
