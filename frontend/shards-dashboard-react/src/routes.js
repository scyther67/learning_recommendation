import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import QuizStart from "./views/QuizStart";
import ViewQuestion from "./views/ViewQuestion";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
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
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost,
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
    path: "/tables",
    layout: DefaultLayout,
    component: Tables,
    noNavbar: false,
    noFooter: false
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts,
    noNavbar: false,
    noFooter: false
  },
  {
    path: "/start-test",
    layout: DefaultLayout,
    component: ViewQuestion,
    noNavbar: false,
    noFooter: true
  }
];
