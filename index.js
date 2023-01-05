const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "containers-us-west-62.railway.app",
  user: "root",
  port: "6378",
  password: "QQgD8tSGMXWPsUemEOW4",
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
  const sqlSelect = `SELECT * FROM railway.order_include_item`; //SQL Injection, coi Predefined Object để fix đi :))
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

//-------------------------------------

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
//------------------customer_homepage-----------------------
app.get("/api/customer/get/order_history/:id", (req, res) => {
  const sqlSelect = (
    "SELECT Order_ID, DateTime, Status, Order_note, Name, Address" + 
    "FROM railway.order_ INNER JOIN railway.shop " + 
    "ON railway.order_.Shop_ID = railway.shop.Shop_ID WHERE railway.order_.Customer_ID = ?"
  );
  db.query(sqlSelect, [req.params.id], (error, result) => {
    res.send(result)
  });
});
//------------------customer_shopList-----------------------
app.get("/api/customer/get/shop_list/", (req, res) => {
  const sqlSelect = (
    "SELECT * FROM railway.shop"
  );
  db.query(sqlSelect, (error, result) => {
    res.send(result)
  });
});

app.get("/api/customer/get/item/:id", (req, res) => {
  const sqlSelect = (
    "SELECT * FROM railway.item WHERE railway.item.Shop_ID = ?"
  );
  db.query(sqlSelect, [req.params.id], (error, result) => {
    res.send(result)
  });
});
//------------------add_order-----------------------
app.post("/api/customer/add_order", (req, res) => {
  const values = [req.body.DateTime, req.body.Status, req.body.Order_note, req.body.Shop_ID, req.body.Customer_ID];
  const sqlSelect = (
    "INSERT INTO order_ (DateTime, Status, Order_note, Shop_ID, Customer_ID) VALUES ?"
  );
  db.query(sqlSelect, [values], (error, result) => {
    if (error) console.log(error);
  });
}); 

//------------IP => localhost:...--------------------------
app.listen(PORT, () => {
  console.log("Server started on port ", PORT, "!");
});
