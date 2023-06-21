import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/login",
    {
      preHandler: fastifyPassport.authenticate("google", {
        scope: ["profile", "email"],
      }),
    },
    (_req, res) => {
      res.send({
        message: "Successfully logged in",
      });
    }
  );

  fastify.get("/logout", (request, reply) => {
    request.logout();
    return { success: true };
  });
};

export default root;
