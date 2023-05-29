import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Input from "../components/Input";
import { Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import { FaBrandsGoogle } from "solid-icons/fa";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/PassInput";
import toast, { Toaster } from "solid-toast";

export const Login: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const Login = async ({ target: { email, password } }: any) => {
    if (!email.value || !password.value) {
      return toast.error("Please fill in all the fields!");
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
          password: password.value,
        }),
        mode: "cors",
      }
    );

    console.log(response);
  };
  return (
    <main class="container">
      <Toaster />
      <form
        class="login"
        onSubmit={(event: any) => {
          event.preventDefault();
          Login(event);
        }}
      >
        <Backdrop sx={{ color: "#fff", zIndex: 10000 }} open={loading()} />
        {loading() && (
          <div class="loader">
            <LinearLoader />
          </div>
        )}
        <section class="text-center">
          <h2>Login</h2>
          <p>Log in to an existing account</p>
        </section>
        <Input
          placeholder="example@mail.com"
          type="email"
          label="E-mail"
          name="email"
        />
        <PassInput placeholder="●●●●●●●●●●●" label="Password" name="password" />
        <Link href="/forgot">
          <small>Forgot password?</small>
        </Link>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
        <Divider />
        <Button class="google-login">
          <GoogleSvg width="20px" height="20px" /> Sign in with Google
        </Button>
      </form>
    </main>
  );
};
