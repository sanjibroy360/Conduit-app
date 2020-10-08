import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Loading from "./Loader";


function Articles() {
  let [articles, setArticles] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/articles?limit=10&offset=0")
      .then(({ data: { articles } }) => {
        setArticles(articles);
        return setIsLoading(false);
      })
      .catch(({ error }) => {
        setError(error);
        return setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div>
      <ul>
        {articles.map((article) => {
          return (
            <li>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;
