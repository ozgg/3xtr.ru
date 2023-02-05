import { authResolvers } from "./auth";
import { corporaResolvers } from "./corpora";

export const Mutation = {
  ...authResolvers,
  ...corporaResolvers
}
