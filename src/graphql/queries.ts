import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
    query GetCharacters($query: String) {
        characters(filter: { name: $query }) {
            results {
                id
                name
                image
                episode {
                    id
                }
            }
        }
    }
`;
