import { FastifyPluginAsync } from "fastify";
import { fastifyPassport } from "../../../utils/passport/passport";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post(
    "/register",
    {
      preHandler: fastifyPassport.authenticate("custom"),
    },
    async function (_request, _reply) {
      console.log("Registering....");

      return {
        message: "Successfully registered",
      };
    }
  );
  fastify.post(
    "/login",
    {
      preHandler: fastifyPassport.authenticate("custom"),
    },
    async function (_request, _reply) {
      console.log("Logging in...");
      return {
        message: "Successfully logged in",
      };
    }
  );
};

export default root;
