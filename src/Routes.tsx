import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {PageNotFound} from "./pages/PageNotFound"
import {AboutPage} from "./pages/About"
import {PlantPage} from "./pages/Planting"
import {TreeInfoPage} from "./pages/TreeInfo"
import {TreesListPage} from "./pages/TreesList"

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