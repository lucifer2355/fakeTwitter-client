import gql from "graphql-tag";

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createAt
        body
      }
    }
  }
`;
