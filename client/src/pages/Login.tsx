import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";

export const Login: Component = () => {
  return (<>
  <main class="login">
    <div>
      <div class="text">
        <p class="title">Login</p>
        <p>Log in to your account</p>
      </div>
      <section>
        <section class="inputs">
          <input placeholder="example@email.com" type="email" />
          <input placeholder="••••••••••" type="password" />
          <small><Link href="/">Forgot your password?</Link></small>
          <button>Log in</button>
        </section>
        <hr />
        <button class="google">Log in with Google</button>
      </section>
    </div>
  </main>
  </>);
};
