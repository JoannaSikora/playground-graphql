import { gql } from "@apollo/client";
import { POST_FIELDS } from "../fragments/postFields";

export const GET_ALL_POSTS = gql`
 query GetAllPosts {
    posts {
        data {
            ...PostFields
        }
    }
  }
  ${POST_FIELDS}
`;