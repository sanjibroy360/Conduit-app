import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { NavLink } from "react-router-dom";

function Tabs({ userInfo }) {
  let context = useContext(UserContext);
  let authTabs = [
    { menuItem: "Home", link: "/" },
    { menuItem: "Feed", link: "/feed" },
    { menuItem: "New Post", link: "/new-post" },
    { menuItem: "Settings", link: "/settings" },
    { menuItem: `${userInfo?.username || "user"}`, link: "/username" },
  ];
  let nonAuthTabs = [
    { menuItem: "Home", link: "/" },
    { menuItem: "Sign In", link: "/login" },
    { menuItem: "Sign Up", link: "/sign-up" },
  ];

  let tabs = context.userInfo ? authTabs : nonAuthTabs;
  return (
    <ul className={context.userInfo ? "menu auth_menu" : "menu non_auth_menu"}>
      {tabs.map((menu) => {
        return (
          <NavLink activeClassName="active_page" to={`${menu.link}`}>
            <li key={menu.menuItem}>
              <nobr>{menu.menuItem}</nobr>
            </li>
          </NavLink>
        );
      })}
    </ul>
  );
}

export default Tabs;
