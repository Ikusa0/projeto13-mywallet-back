import { getUser, createUser } from "./controllers/UserController.js";
import { getReceipt, createRegistry } from "./controllers/ReceiptController.js";
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.post("/login", getUser);
app.post("/singup", createUser);
app.get("/receipt", getReceipt);
app.post("/receipt", createRegistry);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
