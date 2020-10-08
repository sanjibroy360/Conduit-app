import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

function ArticleCard({ article }) {
  let imageUrl = "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
  return (
    <Card link>
      <Card.Content>
        <Image
          size="large"
          src={imageUrl}
        />
        {/* <Image floated="right" size="huge" avatar src={article.author.image} /> */}
        <Card.Header>{article.title}</Card.Header>
        <Card.Meta>- By {article.author.username}</Card.Meta>
        <Card.Description>{article.description.slice(0, 120)||""}</Card.Description>
      </Card.Content>
    </Card>
  );
}

export default ArticleCard;
