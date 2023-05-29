import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function Layout(props: { children: any; score?: number, noFooter?: boolean }) {
  return (
    <>
      <Nav score={props.score} />
      {props.children}
      {props.noFooter ? null : <Footer />}
    </>
  );
}
