import { Context } from "../../graphql";
import { Prisma, Corpus } from "@prisma/client";

interface CorpusArgs {
  corpus: {
    name: string,
    personal: boolean,
    shared: boolean
  }
}

interface CorpusPayloadType {
  userErrors: {
    message: string;
  }[];
  corpus: Corpus | Prisma.Prisma__CorpusClient<Corpus> | null;
}

export const corporaResolvers = {
  corpusCreate: async (
    _: any,
    { corpus }: CorpusArgs,
    { prisma, userInfo }: Context
  ): Promise<CorpusPayloadType> => {
    const userId = userInfo?.userId ?? 0
    const userErrors = []
    let createdCorpus = null

    if (userId < 1) {
      userErrors.push({ message: 'Not authenticated' })
    }

    const { name, personal, shared } = corpus
    if (name.length < 1 || name.length > 100) {
      userErrors.push({ message: 'Name cannot be shorter than 1 or longer than 100 characters' })
    }

    if (userErrors.length < 1) {
      createdCorpus = await prisma.corpus.create({
        data: { userId, name, personal, shared }
      })
    }

    return { userErrors, corpus: createdCorpus }
  }
}
