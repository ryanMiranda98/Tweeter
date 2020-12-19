import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  const deletePost = () => {
    console.log("Delete Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton post={{ id, likes, likeCount }} user={user} />
        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button basic color="blue">
            <Icon name="comments" />
          </Button>
          <Label as="div" basic color="blue" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username ? (
          <Button as="div" color="red" onClick={deletePost} floated="right">
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
