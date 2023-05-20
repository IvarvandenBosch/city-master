import { Component, createSignal } from "solid-js";
import { Link } from "@solidjs/router";

export const Register: Component = () => {
  const register = (event: { target: { email: any; password: any; }; }) => {
    const {email, password} = event.target
  }
  return (
    <>
      <main class="register">
        <div>
          <div class="text">
            <p class="title">Register</p>
            <p>Create an account</p>
          </div>
          <section>
            <form class="inputs">
              <input placeholder="example@email.com" type="email" />
              <input placeholder="••••••••••" type="password" />
              <small>
                <Link href="/login">Already have an account?</Link>
              </small>
              <button>Register</button>
            </form>
            <hr />
            <button class="google">Register with Google</button>
          </section>
        </div>
      </main>
    </>
  );
};
