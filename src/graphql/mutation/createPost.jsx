import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
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
