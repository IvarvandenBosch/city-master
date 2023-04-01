import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/login",
    fastifyPassport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  fastify.get("/logout", (request, reply) => {
    request.logout();
    return { success: true };
  });
};

export default root;
