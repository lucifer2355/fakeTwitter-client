import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY } from "../graphql/query/fetchPost";
import { CREATE_COMMENT_MUTATION } from "../graphql/mutation/createComment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const postId = match.params.postId;

  const [comment, setComment] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    history.push("/");
  }

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
      <Grid style={{ marginTop: 1 }}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated='right'
              size='small'
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
                {user && user.username === username && (
                  <DeleteButton postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>

            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        placeholder='Comment...'
                        name='comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

export default SinglePost;
