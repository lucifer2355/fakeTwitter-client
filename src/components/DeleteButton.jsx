import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../graphql/mutation/deletePost";

const DeleteButton = ({ postId }) => {
  const { deletePost } = useMutation(DELETE_POST_MUTATION, {
    variables: {
      postId,
    },
  });

  return (
    <Button
      as='div'
      color='red'
      floated='right'
      onClick={() => console.log("Delete post")}
    >
      <Icon name='trash' style={{ margin: 0 }} />
    </Button>
  );
};

export default DeleteButton;
