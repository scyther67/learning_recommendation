import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
// import withTracker from "./withTracker";
import QuestionLoader from "./components/QuestionLoader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import "./assets/fonts.css";

import Auth from "./AuthContext";

const App = () => {
  var [email, setEmail] = useState("");

  useEffect(() => {
    var eid = localStorage.getItem("user_name");
    if (eid) {
      // console.log("Logged In");
    } else {
      // console.log("User Not Logged In ");
    }
  }, []);

  return (
    <Auth.Provider value={{ email, setEmail }}>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={() => {
                  return (
                    <route.layout noNavbar={route.noNavbar}>
                      <route.component />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </div>
      </Router>
    </Auth.Provider>
  );
};

export default App;
