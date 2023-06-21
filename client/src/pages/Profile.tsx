import { Component, createSignal, onMount } from "solid-js";
import { Link } from "@solidjs/router";
import Input from "../components/Input";
import { Backdrop, Button, Divider } from "@suid/material";
import LinearLoader from "../components/LinearLoader";
import { FaBrandsGoogle } from "solid-icons/fa";
import GoogleSvg from "../components/GoogleSvg";
import PassInput from "../components/PassInput";
import toast, { Toaster } from "solid-toast";
import Layout from "../Layout";

export const Profile: Component = () => {
  const [loading, setLoading] = createSignal(false);

  const [user, setUser] = createSignal<{
    username: string;
    email: string;
  }>({
    username: "",
    email: "",
  });
  onMount(async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/user/info`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        if (res.error) return toast.error(res.message);
        console.log(res.user);
      });
  });
  return (
    <Layout>
      <main class="container">
        <Toaster />
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          ></div>
        </div>
      </main>
    </Layout>
  );
};
