import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { Dialog } from "@reach/dialog";
import Loading from "./Loader";
import Article from "./Article";

function Articles() {
  let [showDialog, setShowDialog] = useState(true);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  let [showSingleArticle, setShowSingleArticle] = useState(null);
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
    return <Loading />;
  }

  return (
    <div>
      <ul className="cards_wrapper">
        {articles.map((article) => {
          return (
            <>
              {showSingleArticle?.slug === article?.slug && (
                <Article
                  showDialog={showDialog}
                  closeModal={close}
                  article={showSingleArticle}
                />
              )}

              <li>
                <ArticleCard
                  article={article}
                  readArticle={open}
                  setShowSingleArticle={setShowSingleArticle}
                />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;
