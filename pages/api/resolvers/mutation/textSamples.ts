import { Context } from "../../graphql";
import { Prisma, TextSample } from "@prisma/client";

interface TextSampleArgs {
  textSample: {
    body: string,
    corpusId: number
  }
}

interface TextSamplePayloadType {
  userErrors: {
    message: string;
  }[];
  textSample: TextSample | Prisma.Prisma__TextSampleClient<TextSample> | null;
}

export const textSampleResolvers = {
  textSampleCreate: async (
    _: any,
    { textSample }: TextSampleArgs,
    { prisma, userInfo }: Context
  ): Promise<TextSamplePayloadType> => {
    const userId = userInfo?.userId ?? 0
    const userErrors = []
    let createdTextSample = null

    if (userId < 1) {
      userErrors.push({ message: 'Not authenticated' })
    }

    const { body, corpusId } = textSample
    const corpus = await prisma.corpus.findUnique({ where: { id: Number(corpusId) } })

    if (!corpus || corpus.userId !== userId) {
      userErrors.push({ message: `Cannot find corpus ${corpusId} for user ${userId}` })
    }

    if (body.length < 10 || body.length > 5000) {
      userErrors.push({ message: 'Body cannot be shorter than 10 or longer than 5000 characters' })
    }

    if (userErrors.length < 1) {
      createdTextSample = await prisma.textSample.create({
        data: { corpusId, body }
      })
    }

    return { userErrors, textSample: createdTextSample }
  }
}
