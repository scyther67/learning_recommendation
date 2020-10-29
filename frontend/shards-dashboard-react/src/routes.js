import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, NoLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import Errors from "./views/Errors";
import QuizStart from "./views/QuizStart";
import ViewQuestion from "./views/ViewQuestion";
import Signup from "./views/Signup";
import Signin from "./views/Signin";
import QuestionUpload from "./views/QuestionUpload";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/sign-in" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview,
    noNavbar: false,
    noFooter: false
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite,
    noNavbar: false,
    noFooter: false
  },

  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors,
    noNavbar: false,
    noFooter: false
  },
  {
    path: "/quiz",
    layout: DefaultLayout,
    component: QuizStart,
    noNavbar: false,
    noFooter: false
  },

  {
    path: "/start-test",
    layout: DefaultLayout,
    component: ViewQuestion,
    noNavbar: false,
    noFooter: true
  },
  {
    path: "/sign-up",
    layout: NoLayout,
    component: Signup,
    noNavbar: true,
    noFooter: true
  },
  {
    path: "/sign-in",
    layout: NoLayout,
    component: Signin,
    noNavbar: true,
    noFooter: true
  },
  {
    path: "/add-question",
    layout: DefaultLayout,
    component: QuestionUpload,
    noNavbar: false,
    noFooter: true
  }
];
