import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import { BrowserRouter } from 'react-router-dom';
// import RouteTest from './components/_Trash/RouteTest/RouteTest';
// import Admin from './components/_Trash/Admin/Admin';
// import FireAuth from "./components/_Trash/firebaseAuth/App";
// import { ApolloProvider } from "react-apollo";
// import client from "./modules/ApolloClient";

const app = (
  // <ApolloProvider client={client}>
    <App />
  // </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
