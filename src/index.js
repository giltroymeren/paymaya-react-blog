import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => <p>Hello World</p>;

render(
    <App />,
    document.getElementById("app")
);
