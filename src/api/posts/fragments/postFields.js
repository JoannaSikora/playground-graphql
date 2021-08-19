import { gql } from "@apollo/client";

export const POST_FIELDS = gql`
    fragment PostFields on Post {
        title
        id
        body
        author {
           id
           name
         }
    }
`;