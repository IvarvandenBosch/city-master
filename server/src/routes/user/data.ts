import { FastifyPluginAsync } from "fastify";
import User from "../../models/User";
import verify from "../../utils/jwt/verify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/data", async function (request, reply) {
    const verifiedJWT: any = await verify(String(request.headers["x-api-key"]));
    if (verifiedJWT?.error) return verifiedJWT;
    const user = await User.findOne({
      email: verifiedJWT,
    });
    if (!user) return reply.code(400).send({ error: "Unathorized" });
    return {
      email: user.email,
    };
  });
};

export default root;
