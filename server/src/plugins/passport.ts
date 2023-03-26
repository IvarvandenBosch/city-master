import fp from "fastify-plugin";
import { Authenticator } from "@fastify/passport";
import fastifyCookie from "@fastify/cookie";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

/**
 * This plugins adds some utilities to handle formbodys
 *
 * @see https://github.com/fastify/formbody
 */
export default fp(async (fastify) => {
  const fastifyPassport = new Authenticator();
  fastify.register(fastifyCookie);
  fastify.register(require("@fastify/secure-session"), {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
    cookie: {
      path: "/",
      httpOnly: true, // Use httpOnly for all production purposes
      // options for setCookie, see https://github.com/fastify/fastify-cookie
    },
  });
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());

  fastifyPassport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        callbackURL: `${process.env.PROTOCOL}://${process.env.CLIENT_DOMAIN}/oauth2/callback/google`,
      },
      function (accessToken, refreshToken, profile, cb) {
        // Find or Create user
      }
    )
  );
});
