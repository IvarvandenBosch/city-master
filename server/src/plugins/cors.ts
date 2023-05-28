import fp from "fastify-plugin";
import cors, { FastifyCorsOptions } from "@fastify/cors";

/**
 * This plugins adds some utilities to handle cors
 *
 * @see https://github.com/fastify/cors
 */
export default fp<FastifyCorsOptions>(async (fastify) => {
  fastify.register(cors, {
    origin: (_origin: any, cb: any) => {
      cb(null, true);
    },
  });
});
