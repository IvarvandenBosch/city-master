import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/data", async function (request, reply) {
    return request.user
      ? {
          ...request.user,
        }
      : {
          error: "Unathorized",
        };
  });
};

export default root;
