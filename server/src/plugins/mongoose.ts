import fp from "fastify-plugin";
import mongoose from "mongoose";
import { red, green, redBright } from "console-log-colors";
export default fp(async (fastify) => {
  mongoose.connect(
    process.env.MONGODB_CONNECTION_URL ||
      "mongodb://127.0.0.1:27017/city-master"
  );
  const db = mongoose.connection;
  db.once("open", () => {
    console.log(green.bgGreen`Connection to mongodb established.`);
  });
  db.on("error", (err) => {
    console.log(red.bgRed`Connection to mongodb failed.`);
    console.log(redBright(err.message));
  });
  fastify.decorate("models", {});
});

export const findOneOrCreate = async (parameters: any, model: any) => {
  return (
    (await model.findOne({
      ...parameters,
    })) ??
    model.create({
      ...parameters,
    })
  );
};
