import { authResolvers } from "./auth";
import { corporaResolvers } from "./corpora";
import { textSampleResolvers } from "./textSamples";

export const Mutation = {
  ...authResolvers,
  ...corporaResolvers,
  ...textSampleResolvers
}
