import { Mutation} from "./mutation";

export const resolvers = {
  Query: {
    corpora: async () => {
      return []
    },
    corpus: async () => {
      return null
    }
  },
  Mutation
}
