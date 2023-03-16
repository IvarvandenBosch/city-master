import { sign } from "jsonwebtoken";

export default async (payload: string) => {
  return sign(payload, process.env.JWT_SECRET as string);
};
