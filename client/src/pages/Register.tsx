import { Component, createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import { ScreenShake } from "../utils/ScreenShake";

export const Register: Component = () => {
  const register = async (event: any /* For now :any until i figures it out */) => {
    event.preventDefault();

    const config =  await (await fetch("../../config.json")).json()
    console.log(config)
    const { email, password } = event.target;
    const response = await fetch(`${config.api}/oauth2/password/register`, {
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email,password}),
      method:"POST",
      mode:"cors"
    })
    const json = await response.json()
    console.log(json);
    if (!email || !password) return alert("Passord & Email cannot be empty!");
  };
  return (
    <>
      <main class="register">
        <div>
          <div class="text">
            <p class="title">Register</p>
            <p>Create an account</p>
          </div>
          <section>
            <form class="inputs" onSubmit={register}>
              <input
                placeholder="example@email.com"
                name="email"
                type="email"
              />
              <input placeholder="••••••••••" name="password" type="password" />
              <small>
                <Link href="/login">Already have an account?</Link>
              </small>
              <button type="submit">Register</button>
            </form>
            <hr />
            <button class="google">Register with Google</button>
          </section>
        </div>
      </main>
    </>
  );
};
