import { Context } from "../../graphql";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
    const userErrors = []
    let token = null
    const normalizedSlug = slug.toLowerCase()

    const isValidSlug = normalizedSlug.match(/^[a-z0-9_]{2,16}$/)
    if (!isValidSlug) {
      userErrors.push({ message: 'Invalid slug' })
    }

    const existingUser = await prisma.user.findFirst({ where: { slug: normalizedSlug } })
    if (existingUser) {
      userErrors.push({ message: 'User with this slug exists' })
    }

    const isValidPassword = validator.isLength(password, {
      min: 4, max: 70
    });
    if (!isValidPassword) {
      userErrors.push({ message: 'Invalid password (min: 4, max: 70)' })
    }

    if (userErrors.length < 1) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          slug: normalizedSlug,
          password: hashedPassword,
          settings: {},
          profile: {}
        },
      });

      token = JWT.sign(
        { userId: user.id },
        String(process.env.JWT_SIGNATURE),
        { expiresIn: 3600000 }
      )
    }

    return { userErrors, token }
  }
}
