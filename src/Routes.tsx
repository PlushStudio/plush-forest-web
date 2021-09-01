import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {PageNotFound} from "./pages/PageNotFound"
import {AboutPage} from "./pages/About"
import {PlantPage} from "./pages/Planting"
import Index from "./pages/index/Index";
import {TreeInfoPage} from "./pages/TreeInfo"
import {TreesListPage} from "./pages/TreesList"

export const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Index/>
            </Route>
            <Route path="/about">
                <AboutPage/>
            </Route>
            <Route path="/planting">
                <PlantPage/>
            </Route>
            <Route path="/tree/:id/:currentLocation">
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