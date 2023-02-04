import { Context } from "../../graphql";

interface SignUpArgs {
  slug: string,
  password: string
}

export const authResolvers = {
  signUp: async (
    _: any,
    { slug, password }: SignUpArgs,
    { prisma }: Context
  ) => {
    return {
      userErrors: [
        {
          message: "Not implemented",
        },
      ],
      token: null,
    };
  }
}
