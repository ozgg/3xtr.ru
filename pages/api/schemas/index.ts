import { gql } from "apollo-server-micro"

export const typeDefs = gql`
  type User {
      id: ID!
      slug: String!
      name: String
  }
  
  type Corpus {
      id: ID!
      user: User
      name: String!
      textSamples: [TextSample!]!
      nGrams: [NGram!]!
  }
  
  type TextSample {
      id: ID!
      corpus: Corpus!
      body: String!
  }
  
  type NGram {
      id: ID!
      corpus: Corpus!
      n: Int!
      body: String!
      weight: Int!
  }
`
