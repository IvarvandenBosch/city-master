import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/info", async function (request, reply) {
    console.log(request.user);
    return request.user
      ? reply.status(200).send({
          ...request.user,
        })
      : reply.status(401).send({
          error: "Unathorized",
          message: "Unathorized",
        });
  });
};

export default root;
