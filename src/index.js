import React from "react";
import { render } from "react-dom";

import App from "./components/App";
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
    document.getElementById("app")
);
