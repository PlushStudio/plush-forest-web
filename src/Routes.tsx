import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { PageNotFound } from "./PageNotFound"
import { AboutPage } from "./About"
import { PlantPage } from "./Plant"
import { TreeInfoPage } from "./TreeInfo"
import { TreesListPage } from "./TreesList"

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <PageNotFound/>
      </Route>
      <Route path="/about">
        <AboutPage/>
      </Route>
      <Route path="/plant">
        <PlantPage/>
      </Route>
      <Route path="/tree/:id/info">
        <TreeInfoPage/>
      </Route>
      <Route path="/trees">
        <TreesListPage/>
      </Route>
      <Route path="*">
        <PageNotFound/>
      </Route>
    </Switch>
  </Router>
)