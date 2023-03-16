import { FastifyPluginAsync } from "fastify";
import User from "../../../models/User";
import verify from "../../../utils/google/verify";
import sign from "../../../utils/jwt/sign";

type UserT = {
  error?: string;
  email?: string;
  sub?: string;
};
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post("/", async function (request, reply) {
    if (
      typeof request.body !== "object" ||
      !request.body ||
      !Object.hasOwn(request.body, "credential")
    )
      return {
        error: "Invalid signature",
      };
    // Sub === google id
    /* @ts-ignore  since we have already proven that that property exists...*/

    const user: UserT = await verify(request.body.credential);
    if (Object.hasOwn(user, "error"))
      return {
        user,
      };
    if (
      user.hasOwnProperty("sub") &&
      !(await User.findOne({
        gid: user.sub,
      }))
    ) {
      const DBUser = await User.create({
        email: user.email,
        gid: user.sub,
      });
      console.log(DBUser);

      return reply.redirect(
        `${process.env.PROTOCOL}://${
          process.env.CLIENT_DOMAIN
        }/?jwt=${await sign(user.email ?? "")}`
      );
    }

    return reply.redirect(
      `${process.env.PROTOCOL}://${process.env.CLIENT_DOMAIN}/?jwt=${await sign(
        user.email ?? ""
      )}`
    );
  });
};

export default root;
