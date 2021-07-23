import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import "./App.css";
// import { HomePage } from "./toremove/Home";
// import { CreatorPage } from "./Creator";
//import { SurveyPage } from "./Survey";
import { SurveyPage } from "./SurveyWhizz";
import { KCSSurveyPage } from "./SurveyKCS";
// import { ExportToPDFPage } from "./toremove/Export";
import { AnalyticsPage } from "./analytics/Analytics";
import { KcsAnalyticsPage } from "./analytics/AnalyticsKCS";
// import { AnalyticsTabulatorPage } from "./AnalyticsTabulator";
// import { AnalyticsDatatablesPage } from "./AnalyticsDatatables";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, auth, dbInstance} from './utils/firebaseConfig';

import "bootstrap/dist/css/bootstrap.css";

export default function SurveyJSReactApplication() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [isAdmin, setIsAdmin] = useState(false);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      
      if(user) {
        dbInstance.collection("users").where('role', "==", 'ADMIN').where('id', "==", user.uid)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
            console.log("Error getting user privilages", error);
            setIsAdmin(false)
        });
      }
      setIsSignedIn(!!user);
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path="/">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
      </Router>
    );
  }
  return (
    <Router>
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                Kandy City Stay
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">The Whizz</Link>
              </li>
              <li>
                <Link to="/kcs">KCS</Link>
              </li>
              { isAdmin &&
                <React.Fragment>
                  <li>
                    <Link to="/analytics">Analytics Whizz</Link>
                  </li>
                  <li>
                    <Link to="/analyticsKCS">Analytics KCS</Link>
                  </li>
                </React.Fragment>
                
              }
              {/* <li>
                <Link to="/survey">Survey</Link>
              </li>
              <li>
                <Link to="/creator">SurveyJS Creator</Link>
              </li>
              <li>
                <Link to="/export">Export to PDF</Link>
              </li>
              <li>
                <Link to="/analytics">Analytics</Link>
              </li>
              <li>
                <Link to="/analyticstabulator">Results Table</Link>
              </li>
              <li>
                <Link to="/analyticsdatatables">
                  Results Table (IE Support)
                </Link>
              </li> */}
            </ul>
            <a style={{paddingTop:'15px', paddingBottom: '15px', float: 'right'}} onClick={() => {auth.signOut()}}>Sign out</a>
          </div>
        </nav>

        <Switch>
          <Route exact path="/">
            <Redirect to="/whizz" />
          </Route>
          <Route exact path="/whizz">
            <SurveyPage />
          </Route>
          <Route exact path="/kcs">
            <KCSSurveyPage />
          </Route>
          { isAdmin &&
            <React.Fragment>
              <Route path="/analytics">
                <AnalyticsPage />
              </Route>
              <Route path="/analyticsKCS">
                <KcsAnalyticsPage />
              </Route>
            </React.Fragment>
          }
          
          {/* <Route path="/survey">
            <SurveyPage />
          </Route>
          <Route path="/creator">
            <CreatorPage />
          </Route>
          <Route path="/export">
            <ExportToPDFPage />
          </Route>
          <Route path="/analytics">
            <AnalyticsPage />
          </Route>
          <Route path="/analyticsdatatables">
            <AnalyticsDatatablesPage />
          </Route>
          <Route path="/analyticstabulator">
            <AnalyticsTabulatorPage />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
