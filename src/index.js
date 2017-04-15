import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"

//-- react-router-dom is currently using deprecated props as per 15.5.x upgrade 

import Home from "maiku.net/components/pages/home";
import Blog from "maiku.net/components/pages/blog";
import Contacts from "maiku.net/components/pages/contacts";
import Resume from "maiku.net/components/pages/resume";
import Feedback from "maiku.net/components/pages/feedback";
import Portfolio from "maiku.net/components/pages/portfolio";
import Admin from "maiku.net/components/pages/admin";

//-- local resources
import "maiku.net/resources/sass/style.scss";
import "maiku.net/resources/sass/colors/greyscale.scss";
import "maiku.net/resources/sass/layouts/mike.scss";

import "maiku.net/resources/vendor/preloader/preloader.css";
import "maiku.net/resources/vendor/animation/animation.js";
//import "../node_modules/scrollreveal/dist/scrollreveal.min.js"

//-- root element
const root = document.querySelector("#root");


ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/resume" component={Resume} />
      <Route path="/feedback" component={Feedback} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/admin" component={Admin} />
    </div>
  </Router>,
  root
)