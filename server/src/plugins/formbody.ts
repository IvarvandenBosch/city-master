import fp from "fastify-plugin";
import formbody, { FastifyFormbodyOptions } from "@fastify/formbody";

/**
 * This plugins adds some utilities to handle formbodys
 *
 * @see https://github.com/fastify/formbody
 */
export default fp<FastifyFormbodyOptions>(async (fastify) => {
  fastify.register(formbody);
});
