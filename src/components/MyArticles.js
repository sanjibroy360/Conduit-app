import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Article from "./Article";
import ArticleCard from "./ArticleCard";
import { Dialog } from "@reach/dialog";
import Loading from "./Loader";

function MyArticles() {
  let params = useParams();
  let [showDialog, setShowDialog] = useState(true);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  let [showSingleArticle, setShowSingleArticle] = useState(null);
  let [articles, setArticles] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/articles/?author=${params.username}`)
      .then(({ data: { articles } }) => {
        setArticles(articles);
        console.log({ articles });
        setIsLoading(false);
      })
      .catch((error) => toast.error("Something went wrong!"));
  }, []);

  
  return (
    <ul className="articles_list">
      {articles?.map((article) => {
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
  );
}

export default MyArticles;
