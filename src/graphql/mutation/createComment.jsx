import gql from "graphql-tag";

export const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
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
