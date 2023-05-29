import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Layout(props: { children: any; score?: number }) {
  return (
    <>
      <Nav score={props.score} />
      {props.children}
      <Footer />
    </>
  );
}
