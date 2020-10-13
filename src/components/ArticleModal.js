import React from "react";
import moment from "moment";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ArticleModal({ article }) {
  return (
    <div className="article_modal_wrapper">
      <h1>{article.title}</h1>
      <div className="article_header">
        <div className="avatar">
          <img src={article.author.image} alt="author" />
        </div>
        <div className="article_info">
          <p>{article.author.username}</p>
          <p className="date">
            {moment(article.createdAt).format("MMM Do, YYYY")}
          </p>
        </div>
      </div>

      <p className="article_desc">{article.description}</p>
      <Link to={`/article/${article.slug}`}>
        <Button positive>Read More</Button>
      </Link>
    </div>
  );
}

export default ArticleModal;
