import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Input from "../components/Input";
import { Alert, Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/PassInput";
import toast, { Toaster } from "solid-toast";
import Layout from "../Layout";

export const Register: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const Register = async ({ target: { email, username, password } }: any) => {
    if (!email.value || !username.value || !email.value) {
      return toast.error("Please fill in all the fields!");
    }
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/oauth2/password/register`,
      {
        method: "POST",
        credentials: "include",
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
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.error) return toast.error(res.message);
        toast.success(res.message);
        setTimeout(() => {
          // window.location.href = "/profile";
        }, 2000);
      });
  };
  return (
    <Layout>
      <main class="container">
        <Toaster />
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
          <PassInput
            placeholder="●●●●●●●●●●●"
            label="Password"
            name="password"
          />
          <Link href="/login">
            <small>Already have an account?</small>
          </Link>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
          <Divider />
          <Button
            onClick={() => {
              setLoading(true);
            }}
          >
            <a
              class="google-login"
              href={`${import.meta.env.VITE_API}/oauth2/google/login`}
              style={{
                color: "black",
                "text-decoration": "none",
              }}
            >
              <GoogleSvg width="20px" height="20px" />
              Sign in with Google
            </a>
          </Button>
        </form>
      </main>
    </Layout>
  );
};
