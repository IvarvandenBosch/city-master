import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Input from "../components/Input";
import { Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import { FaBrandsGoogle } from "solid-icons/fa";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/passInput";

export const Login: Component = () => {
  const [loading, setLoading] = createSignal(false)
  return (
    <main class="container">
    <form class="login">
      <Backdrop 
        sx={{ color: "#fff", zIndex: 10000 }}
        open={loading()} 
        />
      {loading() && <div class="loader"><LinearLoader/></div>}
      <section class="text-center">
        <h2>Login</h2>
        <p>Log in to an existing account</p>
      </section>
      <Input placeholder="example@mail.com" type="email" label="E-mail"/>
      <PassInput placeholder="●●●●●●●●●●●" label="Password"/>
      <Link href="/forgot"><small>Forgot password?</small></Link>
      <Button variant="outlined" type="submit">Submit</Button>
      <Divider/>
      <Button class="google-login"><GoogleSvg width="20px" height="20px" /> Sign in with Google</Button>
    </form>
    </main>
  );
};
