import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../graphql/mutation/deletePost";

const DeleteButton = ({ postId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

export default DeleteButton;
