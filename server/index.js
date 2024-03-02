const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");

const CLIENT_ID = "1768802caff5f6e9bf7e";
const CLIENT_SECRET = "c49a1c80ad57806118af87cba0ec54651445b7a7";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get("/access_token", async (req, res) => {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      res.json(data);
    });
});

app.get("/userProfile", async (req, res) => {
  req.get("Authorization");
  const response = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  });
  const data = await response.json();
  res.json(data);
});

app.listen(4000, () => {
  console.log("run server port=4000");
});
