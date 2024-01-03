import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import bootstrapCSS from "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/global/Navbar/Navbar";
import Footer from "./components/global/Footer/Footer";


export const links = () => [{ rel: "stylesheet", href: bootstrapCSS }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <main className="min-vh-100">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
