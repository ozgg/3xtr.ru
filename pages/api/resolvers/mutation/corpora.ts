import { Context } from "../../graphql";

interface CorpusArgs {
  slug: string,
  password: string
}

export const corporaResolvers = {
  corpusCreate: async (
    _: any,
    { slug, password }: CorpusArgs,
    { prisma }: Context
  ) => {
    return {
      userErrors: [
        { message: 'Not implemented' },
      ],
      id: null
    }
  }
}
