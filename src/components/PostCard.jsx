import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = ({
  post: { body, createAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://semantic-ui.com/images/avatar2/large/matthew.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />

        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={() => console.log("Delete post")}
          >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
