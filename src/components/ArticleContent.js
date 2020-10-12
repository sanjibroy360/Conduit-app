import React from "react";
import moment from "moment";

function ArticleContent({ article }) {
  return (
    <div className="article_content_wrapper">
      <h1>{article.title}</h1>
      <div className="article_header">
        <div className="avatar">
          <img src={article.author.image} alt="author" />
        </div>
        <div className="article_info">
          <p>{article.author.username}</p>
          <p className="date">{moment(article.createdAt).format("MMM Do, YYYY")}</p>
        </div>
      </div>

      <p>{article.body}</p>
    </div>
  );
}

export default ArticleContent;
