import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY } from "../graphql/query/fetchPost";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";

const SinglePost = ({ match }) => {
  const { user } = useContext(AuthContext);
  const postId = match.params.postId;

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      username,
      createAt,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='mini'
              src='https://semantic-ui.com/images/avatar2/large/matthew.png'
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />

                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => console.log("comment on post")}
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>Single Post Page: {postId}</div>;
};

export default SinglePost;
