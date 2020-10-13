import axios from "axios";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loader";
import { Link } from "react-router-dom";

function SingleArticle({ slug }) {
  let history = useHistory();
  let params = useParams();
  let [article, setArticle] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`articles/${params.slug}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        return setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        history.push("/");
        return setIsLoading(false);
      });
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="article_content_wrapper">
        <h1>{article?.title}</h1>
        <div className="article_header">
          <div className="avatar">
            <img src={article?.author?.image} alt="author" />
          </div>
          <div className="article_info">
            <p>
              <Link to={`/profile/${article?.author.username}`}>
                {article?.author.username}
              </Link>
            </p>
            <p className="date">
              {moment(article?.createdAt).format("MMM Do, YYYY")}
            </p>
          </div>
        </div>

        <p>{article?.body}</p>
      </div>
    </div>
  );
}

export default SingleArticle;
