import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Input from "../components/Input";
import { Alert, Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/PassInput";

export const Register: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const Register = async ({ target: { email, username, password } }: any) => {
    if (!email.value || !username.value || !email.value) {
      return alert("Please fill in all fields"); // Make this a toaster alert
    }
    // HANDLING NEEDED
    const response = await fetch(
      `${import.meta.env.VITE_API}/oauth2/password/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value,
        }),
        mode: "cors",
      }
    );

    console.log(response);
  };
  return (
    <main class="container">
      <form
        class="register"
        onSubmit={(event: any) => {
          event.preventDefault();
          Register(event);
        }}
      >
        <Backdrop sx={{ color: "#fff", zIndex: 10000 }} open={loading()} />
        {loading() && (
          <div class="loader">
            <LinearLoader />
          </div>
        )}
        <div class="padding-top"></div>
        <section class="text-center">
          <h2>Register</h2>
          <p>Create an account</p>
        </section>
        <Input
          placeholder="Citymaster01"
          type="text"
          label="Username"
          name="username"
        />
        <Input
          placeholder="example@mail.com"
          type="email"
          label="E-mail"
          name="email"
        />
        <PassInput placeholder="●●●●●●●●●●●" label="Password" name="password" />
        <Link href="/login">
          <small>Already have an account?</small>
        </Link>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
        <Divider />
        <Button
          class="google-login"
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_API
            }/oauth2/google/login`;
          }}
        >
          <GoogleSvg width="20px" height="20px" /> Sign in with Google
        </Button>
      </form>
    </main>
  );
};
