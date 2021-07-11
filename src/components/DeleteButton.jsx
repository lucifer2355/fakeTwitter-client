import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { DELETE_POST_MUTATION } from "../graphql/mutation/deletePost";
import { FETCH_POSTS_QUERY } from "../graphql/query/fetchPosts";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });

      if (callback) callback();
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
