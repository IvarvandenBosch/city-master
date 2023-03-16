import { verify } from "jsonwebtoken";

export default async (payload: string) => {
  try {
    return verify(payload, process.env.JWT_SECRET as string);
  } catch (_error: unknown) {
    return { error: "Invalid signature" };
  }
};
