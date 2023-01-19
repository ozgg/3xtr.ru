import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { PrismaClient, Prisma } from "@prisma/client";
import prisma from "../../lib/prisma";
import { getUserFromToken } from "../../lib/helpers/getUserFromToken";

interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
}

const context = async ({ req }: any): Promise<Context> => {
  const userInfo = await getUserFromToken(req.headers.authorization);

  return {
    prisma,
    userInfo,
  };
}

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

// Tell Next.js not to parse the incoming request and let GraphQL handle it for us
export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({path: '/api/graphql'})
