import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/register",
    {
      preHandler: fastifyPassport.authenticate("local", {}),
    },
    async function (request, reply) {
      console.log(request.user);
    }
  );
  fastify.post(
    "/login",
    {
      preHandler: fastifyPassport.authenticate("local", {}),
    },
    async function (request, reply) {
      console.log(request.user);
    }
  );
};

export default root;
