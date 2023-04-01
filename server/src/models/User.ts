import { Schema, model } from "mongoose";

const UserSchema: any = new Schema({
  gid: String,
  email: String,
  password: String,
  // Other stuff here soon... Probably game related. Maybe have diffrent documents??
});

export default model("User", UserSchema);
