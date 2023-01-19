import JWT from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, String(process.env.JWT_SIGNATURE)) as {
      userId: number;
    };
  } catch (error) {
    return null;
  }
};
