import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/register",
    {
      preHandler: fastifyPassport.authenticate("custom", {}),
    },
    async function (request, reply) {
      return {
        message: "Successfully registered",
      };
    }
  );
  fastify.post(
    "/login",
    {
      preHandler: fastifyPassport.authenticate("custom", {}),
    },
    async function (request, reply) {
      return {
        message: "Successfully registered",
      };
    }
  );
};

export default root;
