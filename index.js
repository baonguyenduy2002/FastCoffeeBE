const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "containers-us-west-173.railway.app",
  user: "root",
  port: "5631",
  password: "S8fxWJbYCTCSvqRGIczh",
  database: "railway",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to Database", err);
    return;
  }
  console.log("Connection established");
});

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

//------------------order--------------------------
app.get("/", (req, res) => {
  res.send(`
    <div style="font-size: 50px"> Anh Bảo báo vcl =)))</div>
    `);
});

app.get("/api/order/get", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.order_";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.get("/api/order/get/order_item", (req, res) => {
  const sqlSelect = `SELECT * FROM railway.order_include_item`;
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.get("/api/order/get/item", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.order_";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/api/order/accept/:id", (req, res) => {
  const sqlAccept = `UPDATE railway.order_ SET Status = "Accepted" WHERE Order_ID = ?`; //SQL Injection, coi Predefined Object để fix đi :))
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
  });
});

app.post("/api/order/deny/:id", (req, res) => {
  const sqlAccept = `UPDATE railway.order_ SET Status = "Denied" WHERE Order_ID = ?`; //SQL Injection, coi Predefined Object để fix đi :))
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
  });
});

app.post("/api/order/process/:id", (req, res) => {
  const sqlAccept = `UPDATE railway.order_ SET Status = "Processing" WHERE Order_ID = ?`; //SQL Injection, coi Predefined Object để fix đi :))
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
  });
});

app.post("/api/order/ready/:id", (req, res) => {
  const sqlAccept = `UPDATE railway.order_ SET Status = "Ready" WHERE Order_ID = ?`; //SQL Injection, coi Predefined Object để fix đi :))
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
  });
});

app.post("/api/order/finish/:id", (req, res) => {
  const sqlAccept = `UPDATE railway.order_ SET Status = "Finished" WHERE Order_ID = ?`; //SQL Injection, coi Predefined Object để fix đi :))
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
  });
});

//-----------------shop--------------------
app.get("/api/shop/get/:id", (req, res) => {
  const sqlAccept = `SELECT Name,Address FROM shop WHERE Shop_ID = ?`;
  db.query(sqlAccept, [req.params.id], (error, result) => {
    if (error) console.log(error);
    res.send(result[0])
  });
});

//-----------------menu----------------------------
app.get("/api/item/get", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.item";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/api/item/update", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.item";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/api/item/delete", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.item";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

app.post("/api/item/delete", (req, res) => {
  const sqlSelect = "SELECT * FROM railway.item";
  db.query(sqlSelect, (error, result) => {
    res.send(result);
  });
});

//------------------customer_account-----------------------
app.post("/api/customer/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlSelect = (
    "SELECT Acc_ID, Name, Address, DoB, Phone_number, Email " +
    "FROM railway.account INNER JOIN railway.account_customer " + 
    "ON railway.account.Acc_ID = railway.account_customer.Customer_ID " +
    "WHERE railway.account.Email = ? AND railway.account.Password = ?"
  );
  db.query(sqlSelect, [email, password], (error, result) => {
    res.send(result);
  });
});



//------------IP => localhost:...--------------------------
app.listen(PORT, () => {
  console.log("Server started on port ", PORT, "!");
});
