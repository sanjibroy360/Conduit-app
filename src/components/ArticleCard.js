import React, { useState } from "react";

import { Button, Card, Image } from "semantic-ui-react";

function ArticleCard({ article, setShowSingleArticle, readArticle }) {
  function handleClick() {
    setShowSingleArticle(article);
    readArticle();
  }

  let imageUrl =
    "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
  return (
    <div className="card">
      <Card>
        <Card.Content>
          <Image size="large" src={imageUrl} />
          <Card.Header>{article.title.slice(0, 50)}</Card.Header>
          <Card.Meta>- By {article.author.username}</Card.Meta>
          <Card.Description>
            {article.description.slice(0, 80) || ""}
          </Card.Description>
        </Card.Content>
        <Button onClick={handleClick}>Read More ...</Button>
      </Card>
    </div>
  );
}

export default ArticleCard;
