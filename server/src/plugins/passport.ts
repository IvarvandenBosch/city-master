import fp from "fastify-plugin";
import { fastifyPassport } from "../utils/passport/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { findOneOrCreate } from "./mongoose";
import fs from "fs";
/* @ts-ignore */
import { Strategy as LocalStrategy } from "passport-local";
import argon2 from "argon2";
/**
 * This plugins adds some utilities to handle formbodys
 *
 * @see https://github.com/fastify/formbody
 */

export default fp(async (fastify) => {
  fastify.register(require("@fastify/secure-session"), {
    key: fs.readFileSync("google-key"),
    cookie: {
      path: "/",
    },
  });
  fastify.register(fastifyPassport.initialize());
  fastify.register(fastifyPassport.secureSession());
  fastifyPassport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        callbackURL: `${process.env.URL}/oauth2/callback/google`,
      },
      async function (accessToken, refreshToken, profile, cb) {
        cb(
          null,
          await findOneOrCreate(
            {
              gid: profile._json.sub,
              email: profile._json.email,
            },
            {
              gid: profile._json.sub,
              email: profile._json.email,
            },
            User
          )
        );
      }
    )
  );
  fastifyPassport.use(
    new LocalStrategy(async function verify(
      username: string,
      password: string,
      cb: Function
    ) {
      let user = await User.findOne({
        email: username,
      });

      if (user && !argon2.verify(user.password, password)) {
        cb({
          error: "Passwords do not match.",
        });
      }

      if (!user) {
        user = await User.create({
          email: username,
          password: await argon2.hash(password),
        });
      }

      cb(null, user);
    })
  );

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    return user;
  });

  fastifyPassport.registerUserSerializer(async (user: any, request) => {
    return user;
  });
});

export { fastifyPassport };
