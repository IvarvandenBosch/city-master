import { Component, createSignal } from "solid-js";
import { Link } from "@solidjs/router";


export const Register: Component = () => {
  const register = (event:any /* For now :any until i figures it out */ ) => {
    const { email, password } = event.target;

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
            <form class="inputs">
              <input
                placeholder="example@email.com"
                name="email"
                type="email"
              />
              <input placeholder="••••••••••" name="password" type="password" />
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
