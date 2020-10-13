import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "./Loader";
import { Button, Menu } from "semantic-ui-react";
import FavoritedArticles from "./FavoritedArticles";
import MyArticles from "./MyArticles";
import UserContext from "../context/UserContext";

function Profile() {
  let params = useParams();
  let context = useContext(UserContext);
  let [profileInfo, setProfileInfo] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [activeTab, setActiveTab] = useState("myArticles");

  useEffect(() => {
    axios
      .get(`/profiles/${params.username}`)
      .then(({ data: { profile } }) => {
        setIsLoading(false);
        return setProfileInfo(profile);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="profile_header">
        <div className="avatar">
          <img src={profileInfo?.image} alt="avatar" />
        </div>
        <div>
          <p>{profileInfo?.username}</p>
          {context.userInfo?.username !== profileInfo?.username && (
            <Button>{profileInfo?.following ? "Unfollow" : "Follow"}</Button>
          )}
        </div>
      </div>
      <div className="filter_profile_article">
        <Menu fluid widths={2}>
          <Menu.Item
            name="My Articles"
            active={activeTab === "myArticles"}
            onClick={() => setActiveTab("myArticles")}
          />
          <Menu.Item
            name="Favorited Articles"
            active={activeTab === "favoritedArticles"}
            onClick={() => setActiveTab("favoritedArticles")}
          />
        </Menu>
      </div>
      <div className="profile_article_sec">
        {activeTab === "myArticles" ? <MyArticles /> : <FavoritedArticles />}
      </div>
    </div>
  );
}

export default Profile;
