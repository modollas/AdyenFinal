const express = require("express");
const router = express.router();
const path = require("path");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");
const app = express();

const paymentsrouter = require(getPaymentMethods)



// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Parse cookie bodies, and allow setting/getting cookies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
 app.use('/', getPaymentMethods)
app.use('/', initiatePayment)
app.use('/', handleShopperRedirect)
app.use('/', submitAdditionalDetails)

// Adyen Node.js API library boilerplate (configuration, etc.)
const config = new Config();
config.apiKey = "AQEyhmfxK4zJbBZDw0m/n3Q5qf3VaY9UCJ1+XWZe9W27jmlZiniYHPZ+YtXG9dYfNdwN0H8QwV1bDb7kfNy1WIxIIkxgBw==-uA2G0DS73SlmB4EHi/YNndhli7KlCMjXHbMmm8stboc=-djvcdM2gNHq9dSvC";
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);
 
// Use Handlebars as the view engine
app.set("view engine", "handlebars");
 
// Specify where to find view files
app.engine(
  "handlebars",
  hbs({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);

function callServer(url, data) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
}
function handleServerResponse(res, dropin) {
  if (res.action) {
    dropin.handleAction(res.action);
  } else {
    switch (res.resultCode) {
      case "Authorised":
        window.location.assign = "/success";
        break;
      case "Pending":
        window.location.assign = "/pending";
        break;
      case "Refused":
        window.location.assign = "/failed";
        break;
      default:
        window.location.assign = "/error";
        break;
    }
  }
}

function handleSubmission(state, component, url) {
  callServer(url, state.data)
    .then(res => handleServerResponse(res, component))
    .catch(error => {
      throw Error(error);
    });
}


