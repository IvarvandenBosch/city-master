import { Link } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import Input from "../components/Input";
import { Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import { FaBrandsGoogle } from "solid-icons/fa";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/passInput";

export const Register: Component = () => {
  const [loading, setLoading] = createSignal(false)
  return (
    <main class="container">

    <form class="register">
      <Backdrop 
        sx={{ color: "#fff", zIndex: 10000 }}
        open={loading()} 
        />
      {loading() && <div class="loader"><LinearLoader /></div>}
      <div class="padding-top"></div>

      <section class="text-center">
        <h2>Register</h2>
        <p>Create an account</p>
      </section>
      <Input placeholder="Citymaster01" type="text" label="Username"/>
      <Input placeholder="example@mail.com" type="email" label="E-mail"/>
      <PassInput placeholder="●●●●●●●●●●●" label="Password"/>
      <Link href="/login"><small>Already have an account?</small></Link>
      <Button variant="outlined" type="submit">Submit</Button>
      <Divider/>
      <Button class="google-login"><GoogleSvg width="20px" height="20px" /> Sign in with Google</Button>
    </form>
    </main>
  );
};