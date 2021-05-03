const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const expressHandlebars = require("express-handlebars");
const router = express.Router();
const session = require("express-session");
let _db;

/* express functions */

const app = express();
app.use(express.static(__dirname + "/static"));

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "weapons"
  })
);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  session({
    secret: `hidden`,
    saveUninitialized: false,
    resave: false
  })
);

async function dbConnect() {
  const uri = "mongodb+srv://bartek:ostry1234@cluster0.blizs.mongodb.net/<blackmarket>?retryWrites=true&w=majority";
  const client = await new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await client.connect();
  _db = client;
}

/* Insert user in database */
async function registerUser(newUser) {
  await dbConnect();
  await _db.db("blackmarket").collection("users").insertOne(newUser);
}

/* Check if user exists */
async function checkUser(userData) {
  await dbConnect();
  var content = await _db.db("blackmarket").collection("users").find().toArray();

  const foundUser = await content.find(singleuser => singleuser.login === userData.login && singleuser.password === userData.password);

  if (foundUser) {
    return foundUser;
  } else {
    return false;
  }
}

/* User Registration */
app.post("/register", (req, res) => {
  registerUser(req.body).catch(console.error);
  res.end();
});

/* confirm purchase and update user informations */
/* User login */

app.post("/login", async (req, res) => {
  let sess;
  let userExists = await checkUser(req.body).catch(console.error);

  console.log(userExists);

  if (userExists) {
    sess = req.session;
    sess.username = req.body.login;
    sess.balance = userExists.cash;

    res.json({
      userExists,
      sess
    });
  } else if (userExists === false) {
    console.log(userExists);

    res.json({
      userExists
    });
  }

  res.end();
});

app.get("/weapons/:id", async (req, res) => {
  await dbConnect();
  const content = await _db.db("blackmarket").collection("items").find().toArray();
  let contentItem;
  let type = req.params.id;

  switch (type) {
    case "pistols":
      contentItem = content[0].pistols;
      console.log(contentItem);
      break;
    case "rifles":
      contentItem = content[1].rifles;
      break;
    case "grenades":
      contentItem = content[2].grenades;
      break;
    case "closerange":
      contentItem = content[3].closerange;
      break;
    case "rocketlauchner":
      contentItem = content[4].ppanc;
      break;
  }

  await res.render(
    type,
    {
      contentItem
    },
    function (err, html) {
      res.json(html);
    }
  );
});

app.put("/confirm", async (req, res) => {
  await dbConnect();
  await _db
    .db("blackmarket")
    .collection("users")
    .findOneAndUpdate(
      {
        login: req.body.currentUser
      },
      {
        $set: {
          cash: req.body.saldoValue
        }
      }
    );

  await res.json(req.body.saldoValue);
  await res.end();
});

app.listen(process.env.PORT || 5000, () => {
  console.log("running...");
});
