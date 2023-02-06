import { gql } from "apollo-server-micro"

export const typeDefs = gql`
    type Query {
        corpora: [Corpus!]!
        corpus(id: ID!): Corpus
    }
    
    type Mutation {
        corpusCreate(corpus: CorpusInput): CorpusPayload!
        signUp(slug: String!, password: String!): AuthPayload!
    }
    
    type User {
        id: ID!
        slug: String!
        name: String
    }

    type Corpus {
        id: ID!
        user: User
        name: String!
        personal: Boolean!
        shared: Boolean!
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

    type UserError {
        message: String!
    }

    type AuthPayload {
        userErrors: [UserError!]!
        token: String
    }
    
    input CorpusInput {
        name: String
        personal: Boolean
        shared: Boolean
    }

    type CorpusPayload {
        userErrors: [UserError!]!
        corpus: Corpus
    }
`
