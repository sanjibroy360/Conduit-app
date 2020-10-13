import React, { Component, useEffect, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Articles from "./components/Articles";
import Header from "./components/Header";
import axios from "axios";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import UserContext from "./context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import NewArticle from "./components/NewArticle";
import SingleArticle from "./components/SingleArticle";
import Loading from "./components/Loader";
import Profile from "./components/Profile";

axios.defaults.baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";
axios.defaults.headers.post["Content-Type"] = `application/json`;

function App() {
  let [userInfo, setUserInfo] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.authToken) {
      setIsLoading(true);
      axios
        .get("/user", {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        })
        .then(({ data: { user } }) => {
          setUserInfo(user);
          setIsLoading(false);
          return setIsLoggedIn(true);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Something went wrong!");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Header userInfo={userInfo} />
        <Switch>
          <Route path="/" exact component={Articles} />
          <Route
            path="/sign-up"
            exact
            render={() => <Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            exact
            render={() => <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/new-post" component={NewArticle} />
          <Route path="/article/:slug" component={SingleArticle} />
          <Route path="/profile/:username" component={Profile} />
        </Switch>
        <ToastContainer
          className="toast"
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
