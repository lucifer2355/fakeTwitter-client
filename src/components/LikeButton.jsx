import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";

const LikeButton = ({ likeCount }) => {
  const likePost = () => {
    console.log("press like button");
  };

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
