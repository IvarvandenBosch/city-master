import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    // Send back configuration
    console.log(request.isAuthenticated());
    console.log(request.user);
    return {
      name: process.env.NAME,
      version: process.env.VERSION,
      port: process.env.PORT,
      enviroment: process.env.ENVIROMENT,
      protocol: process.env.PROTOCOL,
    };
  });
};

export default root;
