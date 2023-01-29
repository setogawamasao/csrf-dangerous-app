const express = require("express");
const session = require("express-session");
const app = express();
const port = 3001;

// htmlテンプレートエンジンを設定
app.set("view engine", "ejs");

// sessionの設定
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// requestのbodyから値を取得する設定
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const userId = "suzuki";
  req.session.userId = userId;
  var data = {};
  data.userId = userId;
  res.render("./index.ejs", data);
});

app.get("/change", (req, res) => {
  // ログイン状態の確認
  if (!req.session.id) {
    res.send("please login");
  }
  res.render("./change.ejs");
});

app.post("/submit", (req, res) => {
  // ログイン状態の確認
  if (!req.session.id) {
    res.send("please login");
  }
  console.log("session id : ", req.session.id);
  var data = {};
  data.userId = req.session.userId;
  data.password = req.body.password;
  // 本来ここでパスワードの変更処理を実施する。
  res.render("./result.ejs", data);
});

app.listen(port, () => {
  console.log(`danger app listening at http://localhost:${port}`);
});
