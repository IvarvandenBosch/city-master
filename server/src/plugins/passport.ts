import fp from "fastify-plugin";
import { fastifyPassport } from "../utils/passport/passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { findOneOrCreate } from "./mongoose";
import fs from "fs";
/* @ts-ignore */
import { Strategy as CustomStrategy } from "passport-custom";
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
    "custom",
    new CustomStrategy(async function (
      req: {
        body: {
          password: string;
          email: string;
          username: string;
        };
      },
      cb: Function
    ) {
      console.log("Using custom strategy....");
      if (!(req.body.password && (req.body.email || req.body.username))) {
        cb(
          {
            error: "Missing fields",
          },
          null
        );
      }
      let user =
        (await await User.findOne({
          email: req.body.email,
        })) ??
        (await await User.findOne({
          username: req.body.username,
        }));

      if (user && !(await argon2.verify(user.password, req.body.password))) {
        cb(
          {
            error: "Passwords do not match.",
          },
          null
        );
      }

      if (!user) {
        user = await User.create({
          email: req.body.email,
          username: req.body.username,
          password: await argon2.hash(req.body.password),
        });
      }
      cb(null, user);
    })
  );

  fastifyPassport.registerUserDeserializer(async (email: string, req) => {
    if (!email) return;
    const _user = await User.findOne({
      email,
    });
    console.log("Deserializing user... ", _user, email);

    return _user;
  });

  fastifyPassport.registerUserSerializer(async (user: any, request) => {
    console.log("Serializing user...", user, user.email);
    return user.email;
  });
});

export { fastifyPassport };
