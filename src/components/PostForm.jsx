import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { CREATE_POST_MUTATION } from "../graphql/mutation/createPost";

const PostForm = () => {
  const { onSubmit, onChange, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      proxy.readQuery();
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

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

export default PostForm;
