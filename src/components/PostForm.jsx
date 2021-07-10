import React from "react";
import { Form, Button } from "semantic-ui-react";

import { useForm } from "../utils/hooks";
import { gql } from "graphql-tag";

const PostForm = () => {
  const { onSubmit, onChange, values } = useForm(createPostCallback, {
    body: "",
  });

  function createPostCallback() {}

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>

      <Form.Field>
        <Form.Input
          placeholder='Hi World!'
          name='body'
          onChange={onChange}
          value={values.body}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createAt
      username
      likes {
        id
        username
        createAt
      }
      likeCount
      comments {
        id
        body
        username
        createAt
      }
      commentCount
    }
  }
`;

export default PostForm;
