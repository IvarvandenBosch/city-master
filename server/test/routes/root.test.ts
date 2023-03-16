import { test } from "tap";
import { build } from "../helper";

test("default root route", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/",
  });
  t.same(JSON.parse(res.payload), {
    name: process.env.NAME,
    version: process.env.VERSION,
    port: process.env.PORT,
    enviroment: process.env.ENVIROMENT,
    protocol: process.env.PROTOCOL,
  });
});
