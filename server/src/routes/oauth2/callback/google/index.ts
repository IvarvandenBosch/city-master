import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {
      preValidation: fastifyPassport.authenticate("google", {
        scope: ["profile"],
      }),
    },
    function (request, reply) {
      return reply.redirect("/");
    }
  );
};

export default root;
