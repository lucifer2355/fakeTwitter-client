import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      body
      comments {
        id
        body
        username
        createAt
      }
      likes {
        id
        username
        createAt
      }
      likeCount
      commentCount
      createAt
      username
    }
  }
`;
