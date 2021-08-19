import {gql} from "@apollo/client";
import {POST_FIELDS} from "../fragments/postFields";

export const CREATE_POST = gql`
 mutation CreatePost($newPost: PostInput!) {
     createPost: addPost(data: $newPost) {
                ...PostFields
            }
  }
 ${POST_FIELDS}
`;